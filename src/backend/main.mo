import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  // ==== Types ====  
  public type LeaseStatus = { #active; #archived };

  public type SplitRatio = {
    nlo : Nat;
    ulo : Nat;
  };

  public type LeaseListing = {
    id : Text;
    location : Text;
    area : Nat;
    capacity : Nat;
    status : LeaseStatus;
    owner : Principal;
    code : ?Text;
    splitRatio : ?SplitRatio;
  };

  public type LeaseRequest = {
    id : Text;
    listingId : Text;
    tenant : Principal;
    requestDate : Time.Time;
    info : Text;
    status : { #pending; #accepted; #rejected; #cancelled };
  };

  public type UserProfile = {
    name : Text;
  };

  module LeaseListing {
    public func compare(listing1 : LeaseListing, listing2 : LeaseListing) : Order.Order {
      Text.compare(listing1.id, listing2.id);
    };
  };

  module LeaseRequest {
    public func compare(request1 : LeaseRequest, request2 : LeaseRequest) : Order.Order {
      Text.compare(request1.id, request2.id);
    };
  };

  // ==== State ====
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let leaseListings = Map.empty<Text, LeaseListing>();
  let leaseRequests = Map.empty<Text, LeaseRequest>();
  let ownerListings = Map.empty<Principal, Set.Set<Text>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // ==== User Profile Management ====
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ==== Lease Management ====
  public shared ({ caller }) func createLeaseListing(
    id : Text,
    location : Text,
    area : Nat,
    capacity : Nat,
    code : ?Text,
    splitRatio : ?SplitRatio,
  ) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create lease listings");
    };

    let listing : LeaseListing = {
      id;
      location;
      area;
      capacity;
      status = #active;
      owner = caller;
      code;
      splitRatio;
    };

    leaseListings.add(id, listing);

    switch (ownerListings.get(caller)) {
      case (null) {
        let newSet = Set.empty<Text>();
        newSet.add(id);
        ownerListings.add(caller, newSet);
      };
      case (?listingSet) {
        listingSet.add(id);
      };
    };

    id;
  };

  public shared ({ caller }) func updateLeaseListing(
    id : Text,
    location : Text,
    area : Nat,
    capacity : Nat,
    code : ?Text,
    splitRatio : ?SplitRatio,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update listings");
    };

    switch (leaseListings.get(id)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?existingListing) {
        if (existingListing.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the listing owner can update this listing");
        };

        let updatedListing : LeaseListing = {
          existingListing with
          location;
          area;
          capacity;
          code;
          splitRatio;
        };
        leaseListings.add(id, updatedListing);
      };
    };
  };

  public shared ({ caller }) func archiveLeaseListing(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can archive listings");
    };

    switch (leaseListings.get(id)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?listing) {
        if (listing.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the listing owner can archive this listing");
        };

        let updatedListing : LeaseListing = {
          listing with
          status = #archived;
        };
        leaseListings.add(id, updatedListing);
      };
    };
  };

  public query ({ caller }) func getActiveListings() : async [LeaseListing] {
    leaseListings.values().toArray().filter(func(l) { l.status == #active }).sort();
  };

  // ==== Lease Request Management ====
  public shared ({ caller }) func submitLeaseRequest(listingId : Text, info : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only signed-in users can submit requests");
    };

    let requestId = listingId.concat("_").concat(caller.toText()).concat(
      Time.now().toText(),
    );

    let request : LeaseRequest = {
      id = requestId;
      listingId;
      tenant = caller;
      requestDate = Time.now();
      info;
      status = #pending;
    };

    leaseRequests.add(requestId, request);
    requestId;
  };

  public shared ({ caller }) func updateRequestStatus(requestId : Text, newStatus : { #accepted; #rejected }) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update request status");
    };

    switch (leaseRequests.get(requestId)) {
      case (null) { Runtime.trap("Request not found") };
      case (?req) {
        switch (leaseListings.get(req.listingId)) {
          case (null) { Runtime.trap("Listing not found") };
          case (?listing) {
            if (listing.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Unauthorized: Only the listing owner can change request status");
            };
            let updatedRequest = { req with status = newStatus };
            leaseRequests.add(requestId, updatedRequest);
          };
        };
      };
    };
  };

  public query ({ caller }) func getRequestsForListing(listingId : Text) : async [LeaseRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view requests");
    };

    switch (leaseListings.get(listingId)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?listing) {
        if (listing.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the listing owner can view requests");
        };

        leaseRequests.filter(func(_id, r) { r.listingId == listingId }).values().toArray().sort();
      };
    };
  };

  public query ({ caller }) func getTenantRequests() : async [LeaseRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only signed-in users can view their requests");
    };
    let userRequests = leaseRequests.filter(
      func(_id, r) { r.tenant == caller }
    );
    userRequests.values().toArray();
  };

  // ==== Admin Dashboard Functions ====
  public query ({ caller }) func getOwnerListings() : async [LeaseListing] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view their listings");
    };

    switch (ownerListings.get(caller)) {
      case (null) { [] };
      case (?listingSet) {
        let listingIds = listingSet.toArray();
        listingIds.map(
          func(id) {
            switch (leaseListings.get(id)) {
              case (null) { Runtime.trap("Listing not found") };
              case (?listing) { listing };
            };
          }
        );
      };
    };
  };

  public query ({ caller }) func getRequestsForOwner() : async [LeaseRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view their requests");
    };

    var ownerRequests : [LeaseRequest] = [];

    switch (ownerListings.get(caller)) {
      case (null) {};
      case (?listingSet) {
        let listingIds = listingSet.toArray();
        for (listingId in listingIds.values()) {
          let requests = leaseRequests.filter(
            func(_id, r) { r.listingId == listingId }
          );
          let requestsArray = requests.values().toArray();
          ownerRequests := ownerRequests.concat(requestsArray);
        };
      };
    };
    ownerRequests;
  };
};
