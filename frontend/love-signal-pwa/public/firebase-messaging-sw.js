// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_PUSH_VAPID,
//   authDomain: process.env.REACT_APP_PUSH_DOMAIN,
//   projectId: process.env.REACT_APP_PUSH_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_PUSH_PROCESS_BUCKET,
//   messagingSenderId: process.env.REACT_APP_PUSH_SENDER_ID,
//   appId: process.env.REACT_APP_PUSH_APP_ID,
//   measurementId: process.env.REACT_APP_PUSH_MEASUREMENT,
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// self.addEventListener("install", function (e) {
//   console.log("fcm sw install..");
//   self.skipWaiting();
// });

// self.addEventListener("activate", function (e) {
//   console.log("fcm sw activate..");
// });

// self.addEventListener("push", function (e) {
//   console.log("push: ", e.data.json());
//   if (!e.data.json()) return;

//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.body,
//     icon: resultData.image,
//     tag: resultData.tag,
//     ...resultData,
//   };
//   console.log("push: ", { resultData, notificationTitle, notificationOptions });

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener("notificationclick", function (event) {
//   console.log("notification click");
//   const url = "/";
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });
