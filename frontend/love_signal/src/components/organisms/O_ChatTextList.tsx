import React from "react";
import style from "./styles/O_ChatTextList.module.scss";
import M_ChatTextItem from "../molecules/M_ChatTextItem";

type PropsType = {
  roomType?: string;
};

const O_ChatTextList: React.FC<PropsType> = ({ roomType }) => {
  return (
    <ul className={style.textList}>
      <M_ChatTextItem
        roomType={roomType}
        isMe={true}
        text={"안녕하세요"}
        sendTime={"2023-04-30 15:20:12"}
      />
    </ul>
  );
};

export default O_ChatTextList;
