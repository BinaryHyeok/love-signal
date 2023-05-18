import React from "react";
import style from "./styles/A_TopNoticeText.module.scss";

type PropsType = {
  icon?: string;
  text: string;
  resTime?: string;
};

const A_TopNoticeText: React.FC<PropsType> = ({ icon, text, resTime }) => {
  return (
    <div className={style.container}>
      <img src={icon} />
      <div className={style.textBox}>
        <span className={style.text}>{text}</span>
      </div>
      <span className={style.resTime}>{resTime}</span>
    </div>
  );
};

export default A_TopNoticeText;
