import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUSH_VAPID,
  authDomain: process.env.REACT_APP_PUSH_DOMAIN,
  projectId: process.env.REACT_APP_PUSH_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUSH_PROCESS_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUSH_SENDER_ID,
  appId: process.env.REACT_APP_PUSH_APP_ID,
  measurementId: process.env.REACT_APP_PUSH_MEASUREMENT,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getFCMToken = async () => {
  return await getToken(messaging);
};

/* Foreground Listener */
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
