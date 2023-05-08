import React, { useEffect } from "react";
import style from "./styles/O_ChatTextList.module.scss";
import M_ChatTextItem from "../../molecules/Chat/M_ChatTextItem";
import { chat } from "../../../types/chat";

type PropsType = {
  ulRef: React.RefObject<HTMLUListElement>;
  chatList: chat[];
};

const O_ChatTextList: React.FC<PropsType> = ({ ulRef, chatList }) => {
  return (
    <ul className={style.textList} ref={ulRef}>
      {chatList.map((item, idx) => (
        <M_ChatTextItem
          key={idx}
          roomType={item.roomType}
          isMe={item.isMe}
          content={item.content}
          createdDate={item.createdDate}
        />
      ))}
    </ul>
  );
};

export default O_ChatTextList;
