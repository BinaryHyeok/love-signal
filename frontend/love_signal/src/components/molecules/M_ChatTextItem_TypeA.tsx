import React from "react";
import style from "./styles/M_ChatTextItem_TypeA.module.scss";

const ENUM_BACKGROUND: { [key: string]: string } = {
  TEAM: "#cad9ff",
  NOTICE: "#fafbce",
  ALL: "#fbced3",
  ANONYMOUS: "#dccefb",
};

type PropsType = {
  roomType: string;
  text: string;
};

const M_ChatTextItem_TypeA: React.FC<PropsType> = ({ roomType, text }) => {
  return (
    <li className={style.outerBox}>
      <p
        className={style.innerBox}
        style={{ background: ENUM_BACKGROUND[roomType] }}
      >
        {text}
      </p>
    </li>
  );
};

export default M_ChatTextItem_TypeA;
