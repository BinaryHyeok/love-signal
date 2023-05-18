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

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  try {
    const pushData = e.data.json();
    const { title, content, type } = pushData.data;

    const notificationOptions = {
      body: content,
      icon: "/assets/heart-with-arrow.png",
      vibrate: [200, 100, 200, 100],
      actions: [],
    };

    e.waitUntil(self.registration.showNotification(title, notificationOptions));
  } catch (error) {}
});

self.addEventListener("notificationclick", function (event) {
  const notification = event.notification;
  const pushData = notification.data; // 푸시 알림의 데이터
  alert(pushData);
  const { type } = pushData;
  let url = "/";

  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
