import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import style from "./styles/AlertBtn.module.scss";
import { setPushAlarmStatus } from "../../../api/auth";
import { useRecoilState } from "recoil";
import { fcmToken } from "../../../atom/fcm";
import { sendFCMToken } from "../../../api/pwa";

type PropsType = {
  UUID: string;
  atk: string;
  kID: string;
};

const AlertBtn: React.FC<PropsType> = ({ UUID, atk, kID }) => {
  const [pushAlarmIsOn, setPushAlarmIsOn] = useState(false);
  const [myToken, _] = useRecoilState<string>(fcmToken);

  useEffect(() => {
    // const permission = Notification.permission;
    // if (permission === "granted") {
    //   setPushAlarmIsOn(true);
    // } else {
    //   setPushAlarmIsOn(false);
    // }
  }, [Notification.permission]);

  const toggleHandler = () => {
    console.log(pushAlarmIsOn);
    if (pushAlarmIsOn) {
      console.log("null 보냄");
      sendFCMToken(UUID, atk, kID, null);
    } else {
      console.log("토큰 보냄 : ", myToken);
      sendFCMToken(UUID, atk, kID, myToken);
    }
    setPushAlarmIsOn((prev) => !prev);
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
