import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
  type OldLeaseListing = {
    id : Text;
    location : Text;
    area : Nat;
    capacity : Nat;
    status : { #active; #archived };
    owner : Principal;
    code : ?Text;
    splitRatio : ?{
      nlo : Nat;
      ulo : Nat;
    };
  };

  type OldActor = {
    leaseListings : Map.Map<Text, OldLeaseListing>;
    leaseRequests : Map.Map<Text, {
      id : Text;
      listingId : Text;
      tenant : Principal;
      requestDate : Int;
      info : Text;
      status : { #pending; #accepted; #rejected; #cancelled };
    }>;
    ownerListings : Map.Map<Principal, Set.Set<Text>>;
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  type NewLeaseListing = {
    id : Text;
    location : ?Text;
    area : ?Nat;
    capacity : ?Nat;
    status : { #active; #archived };
    owner : Principal;
    code : Text;
    splitRatio : {
      nlo : Nat;
      ulo : Nat;
    };
  };

  type NewActor = {
    leaseListings : Map.Map<Text, NewLeaseListing>;
    leaseRequests : Map.Map<Text, {
      id : Text;
      listingId : Text;
      tenant : Principal;
      requestDate : Int;
      info : Text;
      status : { #pending; #accepted; #rejected; #cancelled };
    }>;
    ownerListings : Map.Map<Principal, Set.Set<Text>>;
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  public func run(old : OldActor) : NewActor {
    let leaseListings = old.leaseListings.map<Text, OldLeaseListing, NewLeaseListing>(
      func(id, oldListing) {
        {
          id = oldListing.id;
          location = ?oldListing.location;
          area = ?oldListing.area;
          capacity = ?oldListing.capacity;
          status = oldListing.status;
          owner = oldListing.owner;
          code = switch (oldListing.code) {
            case (null) { "" };
            case (?c) { c };
          };
          splitRatio = switch (oldListing.splitRatio) {
            case (null) { { nlo = 0; ulo = 1 } };
            case (?ratio) { ratio };
          };
        };
      }
    );
    { old with leaseListings };
  };
};
