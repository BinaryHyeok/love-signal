import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import style from "./styles/AlertBtn.module.scss";
import { setPushAlarmStatus } from "../../../api/auth";
import { useRecoilState } from "recoil";
import { fcmToken } from "../../../atom/fcm";
import { requestPushPermission, sendFCMToken } from "../../../api/pwa";
import { getFCMToken } from "../../../firebase";

type PropsType = {
  UUID: string;
  myNick: string;
  atk: string;
  kID: string;
};

const AlertBtn: React.FC<PropsType> = ({ UUID, myNick, atk, kID }) => {
  const [pushAlarmIsOn, setPushAlarmIsOn] = useState(false);
  const [myToken, _] = useRecoilState<string>(fcmToken);

  useEffect(() => {
    const permission = Notification.permission;
    if (permission === "granted") {
      setPushAlarmIsOn(true);
    } else {
      setPushAlarmIsOn(false);
    }
  }, []);

  const toggleHandler = () => {
    console.log(pushAlarmIsOn);
    if (pushAlarmIsOn) {
      console.log("null 보냄");
      sendFCMToken(UUID, myNick, atk, kID, null);
      setPushAlarmIsOn(false);
    } else {
      requestPushPermission(UUID)
        .then((permission) => {
          if (permission === "granted") {
            getFCMToken()
              .then((token) => {
                console.log("토큰 보냄 : ", token);
                sendFCMToken(UUID, myNick, atk, kID, token);
              })
              .catch((err) => {
                alert("토큰발급에러 : " + err);
              });
          } else if (permission === "denied") {
            setPushAlarmIsOn(false);
            alert("브라우저/앱 설정에서 알림을 허용해야합니다.");
          } else {
            setPushAlarmIsOn(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.text}>
        러브시그널 푸쉬알림받기 ({pushAlarmIsOn ? "허용" : "거부"})
      </div>
      <div className={style.switch} data-active={pushAlarmIsOn}>
        <input
          id="input-switch"
          type="checkbox"
          checked={pushAlarmIsOn}
          onChange={toggleHandler}
        />
        <motion.label className={style.handle} layout htmlFor="input-switch" />
      </div>
    </div>
  );
};

export default AlertBtn;
