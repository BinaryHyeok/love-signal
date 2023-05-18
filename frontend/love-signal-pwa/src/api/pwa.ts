import axios from "axios";

export const getPushPermissionState = () => {
  if (!("Notification" in window)) {
  } else {
    return Notification.permission;
  }
};

export const requestPushPermission = async (uuid: string) => {
  if (!(uuid && uuid.length > 0)) return;

  if (!("Notification" in window)) {
    alert("이 브라우저는 알림을 지원하지 않습니다.");
  } else {
    return await Notification.requestPermission();
  }
};

export const sendFCMToken = async (
  memberUUID: string,
  nickname: string,
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
      nickname,
      token,
    },
  });
};
