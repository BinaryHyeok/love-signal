import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";

import Chat from "./components/template/Chat";

type SubscribeOptions = {
  userVisibleOnly: boolean;
  applicationServerKey: string;
};

const PUBLIC_VAPID_KEY = "";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const swRegistInit = async () => {
        // service worker 등록의 결과를 반환해 registration 변수에 저장
        const registration = await navigator.serviceWorker.register(
          "./service-worker.js"
        );
        registration.waiting?.postMessage("SKIP_WAITING"); // ?

        const subscribeOptions: SubscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: PUBLIC_VAPID_KEY,
        };

        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          // Back to Server And Save subscription on DB
        } else {
          const newSubscription =
            registration.pushManager.subscribe(subscribeOptions);

          // Save Subscription on DB
          axios.post("/subscribe", JSON.stringify(newSubscription), {
            headers: {
              "content-type": "application/json",
            },
          });
        }
      };

      swRegistInit();
    }
  }, []);

  // VAPID 키를 Uint8Array로 변환
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <div className="App">
      <Chat />
    </div>
  );
}

export default App;
