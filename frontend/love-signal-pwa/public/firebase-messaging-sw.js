import { sendFCMToken } from "../src/api/pwa";

importScripts(
  "https://www.gstatic.com/firebasejs/9.6.4/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics-compat.js",
  "https://www.gstatic.com/firebasejs/9.6.4/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCN9e2KjmzUMXa_A7GcS3D51xbSOHPHfWk",
  authDomain: "love-signal-a91bc.firebaseapp.com",
  projectId: "love-signal-a91bc",
  storageBucket: "love-signal-a91bc.appspot.com",
  messagingSenderId: "719224189451",
  appId: "1:719224189451:web:22868b6e8ecab60effcd0e",
  measurementId: "G-SC755QEGW3",
};

/* Background Listener */
const app = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics(app);
const messaging = firebase.messaging();

// 토큰 가져오기
// const getToken = async () => {
//   try {
//     const token = await messaging.getToken();
//     // 토큰을 서버로 전달하고 처리하는 로직 수행
//     console.log("FCM 토큰:", token);
//   } catch (error) {
//     console.error("FCM 토큰 가져오기 실패:", error);
//   }
// };

// // 토큰 가져오기 호출
// getToken();
// sendFCMToken

self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  console.log("fcm, push: ", e.data.json());
  if (!e.data.json()) return;
  try {
    const pushData = e.data.json();
    const { title, content } = pushData.data;

    const notificationOptions = {
      body: content,
      icon: "/assets/heart with arrow.png",
      vibrate: [200, 100, 200, 100],
    };

    e.waitUntil(self.registration.showNotification(title, notificationOptions));
  } catch (error) {
    console.error("푸시 알림 처리 오류:", error);
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
