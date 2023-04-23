import Debug "mo:base/Debug"; // motoko 기반 라이브러리

actor DBank {
  stable var currentValue:Nat = 3000;

  let id = 2302302;
  Debug.print(debug_show(id));

  public func topUp(amount: Nat) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };
  
  public func withdrawl(amount: Nat) {
    let tempValue: Int = currentValue - amount;
    if(tempValue < 0) return Debug.print("withdrawl underflow");

    currentValue -= amount;
    Debug.print(debug_show(currentValue));
  };

  public query func checkBalance(): async Nat {
    return currentValue;
  };
};
