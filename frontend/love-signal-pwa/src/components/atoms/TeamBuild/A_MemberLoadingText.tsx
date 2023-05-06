import React from "react";
import style from "./styles/A_MemberLoadingText.module.scss";

type PropsType = {
  text: string;
};

const A_MemberLoadingText: React.FC<PropsType> = ({ text }) => {
  return (
    <p className={style.text}>
      {text}
      <span className={style.loading}></span>
    </p>
  );
};

export default A_MemberLoadingText;
