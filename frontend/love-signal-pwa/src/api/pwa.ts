import { getToken, getMessaging } from "firebase/messaging";

export const fetchPWAToken = async () => {
  const messaging = getMessaging();

  return await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });
};

export const requestPushPermission = async () => {
  return await Notification.requestPermission();
};
