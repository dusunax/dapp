import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";

actor Token {
  var owner : Principal = Principal.fromText("tcj57-2hio4-izexp-xkuor-qqx4x-lnhsi-tqgnu-6qzr7-w5h7n-3qo3l-sae");
  var totalSupply : Nat = 1000000000;
  var symbol : Text = "DSA";

  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  balances.put(owner, totalSupply);

  // ---------------------------------------
  // 사용자 및 캐니스터 확인 get balances, symbol, principal
  // ---------------------------------------

  /** Principal로 잔고를 확인합니다. */
  public query func balanceOf(who: Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)){
      case null 0;
      case (?result) result; 
    };

    return balance;
  };

  /** 통화 정보를 가져옵니다. */
  public query func getSymbol() : async Text {
    return symbol;
  };

  /** 최초 상태의 사용자인지 확인 */
  public shared(msg) func isNullCallerBalances() : async Bool {
    return balances.get(msg.caller) == null;
  };

  /** 현재 사용자의 principal ID 확인 */
  public shared(msg) func getPrincipal() : async Principal {
    return msg.caller;
  };

  // ---------------------------------------
  // 최초 입금 Faucet
  // ---------------------------------------

  /** faucet을 사용자당 최초 1회 입금 */
  public shared(msg) func payOutFaucet() : async Text {
	  // Debug.print(debug_show(msg.caller));
    if(balances.get(msg.caller) == null) {
      let amount = 10000;

      balances.put(msg.caller, amount);
      return "10,000 DSA 발행 🚩";
    } else {
      return "이미 지급 되었어요.🙄"
    }
  };

  // ---------------------------------------
  // 송금 transfer
  // ---------------------------------------

  /** transfer를 실행한 caller의 balance를 입력받은 Principal로 amount만큼 송금합니다. */
  public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
    // from msg.caller to Principal, as amount
    let fromBalance = await balanceOf(msg.caller);
    if(fromBalance > amount){
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      return "송금 되었습니다.";
    } else {
      return "잔고가 부족합니다.";
    }
  };
}