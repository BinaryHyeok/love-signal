import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import style from "./styles/AlertBtn.module.scss";
import { setPushAlarmStatus } from "../../../api/auth";
import { useRecoilState } from "recoil";
import { fcmToken } from "../../../atom/fcm";
import {
  getPushPermissionState,
  requestPushPermission,
  sendFCMToken,
} from "../../../api/pwa";
import { getFCMToken } from "../../../firebase";

type PropsType = {
  UUID: string;
  myNick: string;
  atk: string;
  kID: string;
  myAlarm: boolean;
  setMyAlarm: (param: boolean) => void;
};

const AlertBtn: React.FC<PropsType> = ({
  UUID,
  myNick,
  atk,
  kID,
  myAlarm,
  setMyAlarm,
}) => {
  console.log(myAlarm);
  const [myToken, _] = useRecoilState<string>(fcmToken);

  useEffect(() => {
    const permission = getPushPermissionState();
    if (permission === "granted") {
      setMyAlarm(true);
    } else {
      setMyAlarm(false);
    }
  }, []);

  const toggleHandler = () => {
    console.log(myAlarm);
    if (myAlarm) {
      console.log("null 보냄");
      sendFCMToken(UUID, myNick, atk, kID, null);
      setMyAlarm(false);
      setPushAlarmStatus(UUID, atk, kID, "false");
    } else {
      requestPushPermission(UUID)
        .then((permission) => {
          if (permission === "granted") {
            getFCMToken()
              .then((token) => {
                console.log("토큰 보냄 : ", token);
                sendFCMToken(UUID, myNick, atk, kID, token);
                setPushAlarmStatus(UUID, atk, kID, "true");
              })
              .catch((err) => {
                console.error("토큰발급에러 : " + err);
              });
          } else if (permission === "denied") {
            setMyAlarm(false);
            alert("브라우저/앱 설정에서 알림을 허용해야합니다.");
          } else {
            setMyAlarm(true);
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
        러브시그널 푸쉬알림받기 ({myAlarm ? "허용" : "거부"})
      </div>
      <div className={style.switch} data-active={myAlarm}>
        <input
          id="input-switch"
          type="checkbox"
          checked={myAlarm}
          onChange={toggleHandler}
        />
        <motion.label className={style.handle} layout htmlFor="input-switch" />
      </div>
    </div>
  );
};

export default AlertBtn;
