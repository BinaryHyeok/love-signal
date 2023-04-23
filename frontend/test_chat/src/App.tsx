import React, { useEffect } from "react";
import "./App.css";

import Chat from "./components/template/Chat";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const swRegistInit = async () => {
        // service worker 등록의 결과를 반환해 registration 변수에 저장
        const registration = await navigator.serviceWorker.register(
          "./service-worker.js"
        );
        registration.waiting?.postMessage("SKIP_WAITING");

        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          // Back to Server And Save subscription on DB
        } else {
          // registration.pushManager
          //   .subscribe({
          //     userVisibleOnly: true,
          //     applicationServerKey: "",
          //   })
          //   .then((newSubscription) => {
          //     // Save Subscription on DB
          //   });
        }
      };

      swRegistInit();
    }
  }, []);

  return (
    <div className="App">
      <Chat />
    </div>
  );
}

export default App;
