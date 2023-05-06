import React from "react";
import style from "./styles/A_ChatText_TypeB.module.scss";

type PropsType = {
  background?: string;
  text: string;
  sender?: string;
};

const A_ChatText_TypeB: React.FC<PropsType> = ({
  background,
  text,
  sender,
}) => {
  return (
    <div>
      <span className={style.sender}>{sender}</span>
      <p
        className={style.text}
        style={background ? { background: background } : { background: "#fff" }}
      >
        {text}
      </p>
    </div>
  );
};

export default A_ChatText_TypeB;
