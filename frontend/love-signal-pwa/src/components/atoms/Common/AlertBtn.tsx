import { BaseSyntheticEvent, useState } from "react";
import { motion } from "framer-motion";
import style from "./styles/AlertBtn.module.scss";
import { useRecoilState } from "recoil";
import { alertAllowState } from "../../../atom/member";

const AlertBtn = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAllow, setIsAllow] = useRecoilState<boolean>(alertAllowState);
  const toggleSwitch = (e: BaseSyntheticEvent) => setIsActive(e.target.checked);
  const alertAllow = () => {
    if (!isActive) {
      setIsAllow(true);
    } else {
      setIsAllow(false);
    }
  };

  return (
    <div className={style.container}>
      <div>러브시그널 푸쉬알림받기 ({isAllow ? "허용" : "거부"})</div>
      <div className={style.switch} data-active={isActive}>
        <input
          id="input-switch"
          type="checkbox"
          checked={isActive}
          onChange={toggleSwitch}
          onClick={alertAllow}
        />
        <motion.label className={style.handle} layout htmlFor="input-switch" />
      </div>
    </div>
  );
};

export default AlertBtn;
