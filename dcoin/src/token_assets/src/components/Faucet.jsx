import React, { useEffect, useState } from "react";
import { token } from "../../../declarations/token/index";
import Spinner from "./spinner/Spinner";

function Faucet() {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonMsg, setButtonMsg] = useState('발행');

  async function handleClick(event) {
    setLoading(true);
    const result = await token.payOutFaucet();
    
    if(result) {
      setIsDisabled(true);
      
      setTimeout(()=>{
        setLoading(false);
        setButtonMsg(result);
      }, 200)
    }
  };

  async function chkIsFirstFaucet() {
    setLoading(true);
    const result = await token.isNullCallerBalances();

    if(!result) {
      setButtonMsg("이미 지급 되었어요.🙄");
      setIsDisabled(true);
    }

    setLoading(false);
  };

  useEffect(()=>{
    chkIsFirstFaucet();
  }, [])

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          💧
        </span>
        Faucet
      </h2>
      <label>
        Get your free Dcoin tokens here! Claim 10,000 DSA coins to your account.
      </label>

      <p className="trade-buttons">
        {loading && <Spinner />}

        {!loading &&
          <button id="btn-payout" disabled={isDisabled} onClick={handleClick}>
            {buttonMsg}
          </button>
        }
      </p>
    </div>
  );
}

export default Faucet;
