import React from "react";
import style from "./styles/A_ChatText_TypeB.module.scss";

type PropsType = {
  background?: string;
  content?: string | JSX.Element;
  nickname?: string;
  isNotice?: boolean;
};

const A_ChatText_TypeB: React.FC<PropsType> = ({
  background,
  content,
  nickname,
  isNotice,
}) => {
  return (
    <div className={`${style.chatBox} ${isNotice ? style.notice : ""}`}>
      <span className={style.sender}>{nickname}</span>
      <div
        className={`${style.text} ${isNotice ? style.notice : ""}`}
        style={background ? { background: background } : { background: "#fff" }}
      >
        {content}
      </div>
    </div>
  );
};

export default A_ChatText_TypeB;
