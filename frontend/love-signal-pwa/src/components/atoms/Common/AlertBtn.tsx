import { BaseSyntheticEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import style from "./styles/AlertBtn.module.scss";
import { useRecoilState } from "recoil";
import { alertAllowState } from "../../../atom/member";

import { firebaseMessaging } from "../../../atom/fcm";
import { Messaging } from "@firebase/messaging";

import {
  fetchPWAToken,
  requestPushPermission,
  sendFCMToken,
} from "../../../api/pwa";
import { Props } from "@react-three/fiber";

type PropsType = {
  UUID: string;
  atk: string;
  kID: string;
};

const AlertBtn: React.FC<PropsType> = ({ UUID, atk, kID }) => {
  const [messaging, _] = useRecoilState<Messaging>(firebaseMessaging);
  const [pushAlarmIsOn, setPushAlarmIsOn] = useState(false);
  const toggleSwitch = (e: BaseSyntheticEvent) =>
    setPushAlarmIsOn(e.target.checked);

  useEffect(() => {
    const permission = Notification.permission;
    if (permission === "granted") {
      setPushAlarmIsOn(true);
    } else {
      setPushAlarmIsOn(false);
    }
  }, [Notification.permission]);

  const pushAlarmToggleHandler = () => {
    if (!pushAlarmIsOn) {
      fetchPWAToken(messaging)
        .then((token) => {
          sendFCMToken(UUID, atk, kID, token);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetchPWAToken(messaging)
        .then((token) => {
          console.log(token);
          sendFCMToken(UUID, atk, kID, null);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    setPushAlarmIsOn((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={style.container}>
      <div>러브시그널 푸쉬알림받기 ({pushAlarmIsOn ? "허용" : "거부"})</div>
      <div className={style.switch} data-active={pushAlarmIsOn}>
        <input
          id="input-switch"
          type="checkbox"
          checked={pushAlarmIsOn}
          onChange={toggleSwitch}
          onClick={pushAlarmToggleHandler}
        />
        <motion.label className={style.handle} layout htmlFor="input-switch" />
      </div>
    </div>
  );
};

export default AlertBtn;
