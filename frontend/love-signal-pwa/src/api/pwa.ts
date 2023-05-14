import axios from "axios";
const { getToken, Messaging } = require("firebase/messaging");

export const fetchPWAToken = async (messaging: typeof Messaging) => {
  return await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });
};

export const requestPushPermission = async () => {
  return await Notification.requestPermission();
};

export const sendFCMToken = async (
  memberUUID: string,
  atk: string,
  kID: string,
  token: string
) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/fcm/token`,
    headers: {
      "X-Auth_Token": atk,
      "X-Auth_ID": kID,
    },
    data: {
      memberUUID,
      token,
    },
  });
};
