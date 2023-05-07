import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

actor Token {
  var owner : Principal = Principal.fromText("tcj57-2hio4-izexp-xkuor-qqx4x-lnhsi-tqgnu-6qzr7-w5h7n-3qo3l-sae");
  var totalSupply : Nat = 1000000000;
  var symbol : Text = "DSA";

  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  balances.put(owner, totalSupply);

  public query func balanceOf(who: Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)){
      case null 0;
      case (?result) result; 
    };

    return balance;
  }
}