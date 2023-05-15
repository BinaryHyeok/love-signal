import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </>
);

serviceWorkerRegistration.register();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker 등록 완료:", registration);
      })
      .catch((error) => {
        console.error("Service Worker 등록 실패:", error);
      });
  });
}

// Service Worker 등록
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/service-worker.ts")
//     .then((registration) => {
//       console.log("Service Worker registered.");

//       // PushManager 구독 정보 등록
//       // registration.pushManager.getSubscription().then((subscription) => {
//       //   pushSubscription = subscription;
//       // });
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }
