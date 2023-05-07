import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { token } from "../../../declarations/token/index"

import Spinner from "./spinner/Spinner";

function Transfer() {
  const [inputValue, setInputValue] = useState("");
  const [amountValue, setAmountValue] = useState(0);
  const [feedback, setFeedback] = useState("");
  
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if(amountValue <= 0 || inputValue === "") return alert('계좌와 금액을 정확히 입력하세요.');

    setLoading(true);

    const recipient = Principal.fromText(inputValue);
    const result = await token.transfer(recipient, +amountValue);
    
    if(result){
      setAmountValue(0);
      setFeedback(`${result} (${(+amountValue).toLocaleString()} DSA)`);
    }
    setLoading(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amountValue}
                onChange={(e) => setAmountValue(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>

        {loading && <Spinner />}
        {!loading && 
          <>
            <p className="trade-buttons">
              <button id="btn-transfer" onClick={handleClick} >
                Transfer
              </button>
            </p>
            <p className="feedback">
              {feedback}
            </p>
          </>
        }
      </div>
    </div>
  );
}

export default Transfer;
