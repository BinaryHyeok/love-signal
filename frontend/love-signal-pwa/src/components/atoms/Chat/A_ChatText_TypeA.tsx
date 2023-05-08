import React from "react";
import style from "./styles/A_ChatText_TypeA.module.scss";

type PropsType = {
  background: string;
  content?: string;
};

const A_ChatText_TypeA: React.FC<PropsType> = ({ background, content }) => {
  return (
    <p className={style.text} style={{ background: background }}>
      {content}
    </p>
  );
};

export default A_ChatText_TypeA;
