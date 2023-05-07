import React, { useEffect, useState } from "react";
import { Principal } from '@dfinity/principal';
import { token } from "../../../declarations/token/index";

function Balance() {
  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);

    setBalance(balance.toLocaleString());
    setCryptoSymbol(await token.getSymbol());
  };

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
            onChange={(e) => setInput(e.target.value)
          }
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          잔고 확인하기
        </button>
      </p>
      <p>{balanceResult && `This account has a balance of ${balanceResult} ${cryptoSymbol}.`}</p>
    </div>
  );
}

export default Balance;
