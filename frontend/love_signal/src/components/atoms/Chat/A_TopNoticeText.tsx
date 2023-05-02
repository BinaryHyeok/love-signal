import React from "react";
import style from "./styles/A_TopNoticeText.module.scss";

type PropsType = {
  icon?: string;
  text: string;
  resTime?: string;
};

const A_TopNoticeText: React.FC<PropsType> = ({ icon, text, resTime }) => {
  return (
    <>
      <img src={icon} />
      <span className={style.text}>{text}</span>
      <span className={style.resTime}>{resTime}</span>
    </>
  );
};

export default A_TopNoticeText;
