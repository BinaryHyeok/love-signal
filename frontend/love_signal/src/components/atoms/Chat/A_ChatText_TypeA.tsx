import React from "react";
import style from "./styles/A_ChatText_TypeA.module.scss";

type PropsType = {
  background: string;
  text: string;
};

const A_ChatText_TypeA: React.FC<PropsType> = ({ background, text }) => {
  return (
    <p className={style.text} style={{ background: background }}>
      {text}
    </p>
  );
};

export default A_ChatText_TypeA;
