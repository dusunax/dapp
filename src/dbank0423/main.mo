// motoko 기본 라이브러리
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  let id = 2302302;
  stable var currentValue: Float = 3000;
  currentValue := 3000; 
  
  stable var startTime = Time.now();
  Debug.print(debug_show(currentValue));

  public func topUp(amount: Float) {
    currentValue += amount;
  };
  
  public func withdrawl(amount: Float) {
    Debug.print(debug_show(amount));
    let tempValue: Float = currentValue - amount;
    if(tempValue < 0) return Debug.print("withdrawl underflow");

    currentValue -= amount;
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    
    startTime := currentTime;
    currentValue := currentValue * (1.0001 ** Float.fromInt(timeElapsedS));
  }
};
