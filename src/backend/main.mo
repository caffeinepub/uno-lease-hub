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
  public type LeaseStatus = { #available; #archived; #unavailable };

  public type SplitRatio = {
    nlo : Nat;
    ulo : Nat;
  };

  public type LeaseListing = {
    id : Text;
    location : ?Text;
    area : ?Nat;
    capacity : ?Nat;
    status : LeaseStatus;
    code : Text;
    splitRatio : SplitRatio;
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
    code : Text,
    splitRatio : SplitRatio,
    location : ?Text,
    area : ?Nat,
    capacity : ?Nat,
  ) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create lease listings");
    };

    let listing : LeaseListing = {
      id;
      code;
      splitRatio;
      location;
      area;
      capacity;
      status = #available;
    };

    leaseListings.add(id, listing);

    id;
  };

  public shared ({ caller }) func updateLeaseListing(
    id : Text,
    code : Text,
    splitRatio : SplitRatio,
    location : ?Text,
    area : ?Nat,
    capacity : ?Nat,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update listings");
    };

    switch (leaseListings.get(id)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?existingListing) {
        let updatedListing : LeaseListing = {
          existingListing with
          code;
          splitRatio;
          location;
          area;
          capacity;
        };
        leaseListings.add(id, updatedListing);
      };
    };
  };

  public shared ({ caller }) func archiveLeaseListing(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can archive listings");
    };

    switch (leaseListings.get(id)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?listing) {
        let updatedListing = {
          listing with status = #archived;
        };
        leaseListings.add(id, updatedListing);
      };
    };
  };

  public shared ({ caller }) func updateLeaseAvailability(id : Text, status : LeaseStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only the admin can update lease availability");
    };

    switch (leaseListings.get(id)) {
      case (null) { Runtime.trap("Listing not found") };
      case (?listing) {
        let updatedListing = { listing with status };
        leaseListings.add(id, updatedListing);
      };
    };
  };

  // Public query - no authentication required, accessible by guests
  public query func getActiveListings() : async [LeaseListing] {
    leaseListings.values().toArray().filter(func(l) { l.status == #available }).sort();
  };

  // Public query - no authentication required, accessible by guests
  public query func getPublicListings() : async [LeaseListing] {
    leaseListings.filter(
      func(_id, listing) { listing.status == #available }
    ).values().toArray();
  };

  // ==== Lease Request Management ====
  public shared ({ caller }) func submitLeaseRequest(listingId : Text, info : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
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
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only the admin can update request status");
    };

    switch (leaseRequests.get(requestId)) {
      case (null) { Runtime.trap("Request not found") };
      case (?req) {
        switch (leaseListings.get(req.listingId)) {
          case (null) { Runtime.trap("Listing not found") };
          case (_) {
            let updatedRequest = { req with status = newStatus };
            leaseRequests.add(requestId, updatedRequest);
          };
        };
      };
    };
  };

  public query ({ caller }) func getRequestsForListing(listingId : Text) : async [LeaseRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only the admin can view requests for listings");
    };

    let filtered = leaseRequests.filter(func(_id, r) { r.listingId == listingId });
    filtered.values().toArray();
  };

  public query ({ caller }) func getTenantRequests() : async [LeaseRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only signed-in users can view their requests");
    };
    let userRequests = leaseRequests.filter(
      func(_id, r) { r.tenant == caller }
    );
    userRequests.values().toArray();
  };

  public query ({ caller }) func getOwnerListings() : async [LeaseListing] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only the admin can view owner listings");
    };

    leaseListings.values().toArray();
  };

  public query ({ caller }) func getRequestsForOwner() : async [LeaseRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only the admin can view all requests");
    };

    leaseRequests.values().toArray();
  };
};

