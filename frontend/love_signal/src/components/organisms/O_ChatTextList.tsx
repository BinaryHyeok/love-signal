import React from "react";
import style from "./styles/O_ChatTextList.module.scss";
import M_ChatTextItem_TypeA from "../molecules/M_ChatTextItem_TypeA";

type PropsType = {
  roomType: string;
};

const O_ChatTextList: React.FC<PropsType> = ({ roomType }) => {
  return (
    <ul className={style.textList}>
      <M_ChatTextItem_TypeA
        roomType={roomType}
        text={"안녕하세요안녕하세요안녕하세요안녕하세요"}
      />
      <M_ChatTextItem_TypeA
        roomType={roomType}
        text={"안녕하세요안녕하세요안녕하세요안녕하세요"}
      />
      <M_ChatTextItem_TypeA
        roomType={roomType}
        text={"안녕하세요안녕하세요안녕하세요안녕하세요"}
      />
    </ul>
  );
};

export default O_ChatTextList;
