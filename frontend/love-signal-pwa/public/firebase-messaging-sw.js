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
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().data;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    // body: resultData.body,
    body: resultData.content,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
