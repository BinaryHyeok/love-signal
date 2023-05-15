import { BaseSyntheticEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import style from "./styles/AlertBtn.module.scss";
import { useRecoilState } from "recoil";

import { firebaseMessaging } from "../../../atom/fcm";
import { Messaging } from "@firebase/messaging";

import {
  fetchPWAToken,
  requestPushPermission,
  sendFCMToken,
} from "../../../api/pwa";
import { Props } from "@react-three/fiber";
import { setPushAlarmStatus } from "../../../api/auth";

type PropsType = {
  UUID: string;
  atk: string;
  kID: string;
};

const AlertBtn: React.FC<PropsType> = ({ UUID, atk, kID }) => {
  const [messaging, setMessaging] =
    useRecoilState<Messaging>(firebaseMessaging);
  const [pushAlarmIsOn, setPushAlarmIsOn] = useState(false);
  const toggleSwitch = (e: BaseSyntheticEvent) =>
    setPushAlarmIsOn(e.target.checked);

  useEffect(() => {
    const permission = Notification.permission;
    if (permission === "granted") {
      setPushAlarmIsOn(true);
      setPushAlarmStatus(UUID, atk, kID, "true");
    } else {
      setPushAlarmIsOn(false);
      setPushAlarmStatus(UUID, atk, kID, "true");
    }
  }, [Notification.permission]);

  const pushAlarmToggleHandler = () => {
    const messagingCopied = { ...messaging };
    if (!pushAlarmIsOn) {
      fetchPWAToken(messagingCopied)
        .then((token) => {
          sendFCMToken(UUID, atk, kID, token);
          setPushAlarmStatus(UUID, atk, kID, "true");
          setMessaging(messagingCopied);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetchPWAToken(messagingCopied)
        .then(() => {
          sendFCMToken(UUID, atk, kID, null);
          setPushAlarmStatus(UUID, atk, kID, "false");
          setMessaging(messagingCopied);
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
      <div className={style.text}>
        러브시그널 푸쉬알림받기 ({pushAlarmIsOn ? "허용" : "거부"})
      </div>
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
