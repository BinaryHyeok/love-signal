import axios from "axios";
import { getToken, Messaging } from "@firebase/messaging";

export const fetchPWAToken = async (messaging: Messaging) => {
  return await getToken(messaging);
};

export const requestPushPermission = async () => {
  if (!("Notification" in window)) {
    console.log("이 브라우저는 알림을 지원하지 않습니다.");
  } else {
    return await Notification.requestPermission();
  }
};

export const sendFCMToken = async (
  memberUUID: string,
  atk: string,
  kID: string,
  token: string | null
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
