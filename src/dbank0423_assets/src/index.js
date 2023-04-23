import { dbank0423 } from "../../declarations/dbank0423";

/** 화면에 dbank의 currentValue를 출력합니다. */
async function printCurrentAmount () {
  const currentAmount = await dbank0423.checkBalance();  
  console.log(currentAmount);
  document.getElementById("value").innerText = setLocalMoney(currentAmount);
}

/** 숫자를 소숫점 1자리 까지 잘라, 3자리마다 ","를 찍어 반환합니다. */
function setLocalMoney (int) {
  return int.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.addEventListener("load", async ()=>{
  printCurrentAmount();

  const inputEl = document.getElementById("input-amount");
  const outputEl = document.getElementById("withdrawal-amount");

  inputEl.addEventListener("focus", ()=>{ outputEl.value = "" });
  outputEl.addEventListener("focus", ()=>{ inputEl.value = "" });
});

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = document.getElementById("submit-btn");
  const inputEl = document.getElementById("input-amount");
  const outputEl = document.getElementById("withdrawal-amount");

  const inputAmount = parseFloat(inputEl.value);
  const outputAmount = parseFloat(outputEl.value);

  inputEl.value = ""
  outputEl.value = ""

  submitButton.setAttribute("disabled", true);

  if(inputAmount) {
    await dbank0423.topUp(inputAmount);
  }

  if(outputAmount) {
    await dbank0423.withdrawl(outputAmount);
  }

  await dbank0423.compound();
  
  printCurrentAmount();
  submitButton.removeAttribute("disabled")
});
