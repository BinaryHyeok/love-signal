import React from "react";
import style from "./styles/A_ChatText_TypeB.module.scss";

type PropsType = {
  background?: string;
  content?: string;
  nickname?: string;
};

const A_ChatText_TypeB: React.FC<PropsType> = ({
  background,
  content,
  nickname,
}) => {
  return (
    <div>
      <span className={style.sender}>{nickname}</span>
      <p
        className={style.text}
        style={background ? { background: background } : { background: "#fff" }}
      >
        {content}
      </p>
    </div>
  );
};

export default A_ChatText_TypeB;
