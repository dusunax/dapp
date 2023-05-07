import React from "react";

function Faucet() {

  async function handleClick(event) {

  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          💧
        </span>
        Faucet
      </h2>
      <label>Get your free Dcoin tokens here! Claim 10,000 DSA coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick}>
          발행
        </button>
      </p>
    </div>
  );
}

export default Faucet;
