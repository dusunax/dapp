import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '@dfinity/auth-client/lib/cjs/index';

const init = async () => { 
  const authClient = await AuthClient.create();

  /** isAuthenticated 여부를 확인합니다.
   * 1) 로그인 되어 있다면, handleAuthenticate을 실행해 DOM을 render합니다.
   * 2) 로그인 되어있지 않다면, authClient의 login 메소드를 실행합니다. login이 onSuccess 시, callback 함수로 handleAuthenticate을 실행해 DOM을 render합니다.
   */
  if (await authClient.isAuthenticated()) {
    console.log("로그인")
    handleAuthenticate(authClient)
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticate(authClient)
      }
    })
  }
}

async function handleAuthenticate(authClient) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();


