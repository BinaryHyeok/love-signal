const { getToken, Messaging } = require("firebase/messaging");

export const fetchPWAToken = async (messaging: typeof Messaging) => {
  return await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });
};

export const requestPushPermission = async () => {
  return await Notification.requestPermission();
};
