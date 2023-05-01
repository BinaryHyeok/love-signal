import React from "react";
import style from "./styles/M_ChatTextItem.module.scss";
import A_ChatText_TypeA from "../atoms/Chat/A_ChatText_TypeA";
import A_ChatSendTime from "../atoms/Chat/A_ChatSendTime";

const ENUM_BACKGROUND: { [key: string]: string } = {
  TEAM: "#cad9ff",
  NOTICE: "#fafbce",
  GROUP: "#fbced3",
  ANONYMOUS: "#dccefb",
};

type PropsType = {
  roomType?: string;
  isMe: boolean;
  text: string;
  sendTime: string;
};

const M_ChatTextItem: React.FC<PropsType> = ({
  roomType,
  isMe,
  text,
  sendTime,
}) => {
  return (
    <li className={style.outerBox}>
      {isMe ? (
        <A_ChatText_TypeA
          background={roomType ? ENUM_BACKGROUND[roomType] : ""}
          text={text}
        />
      ) : null}
      <A_ChatSendTime sendTime={sendTime} />
    </li>
  );
};

export default M_ChatTextItem;
