import React from "react";
import style from "./styles/M_ChatTextItem.module.scss";
import A_ChatText_TypeA from "../../atoms/Chat/A_ChatText_TypeA";
import A_ChatText_TypeB from "../../atoms/Chat/A_ChatText_TypeB";
import A_ChatSendTime from "../../atoms/Chat/A_ChatSendTime";
import A_ChatSenderImg from "../../atoms/Chat/A_ChatSenderImg";

const ENUM_BACKGROUND: { [key: string]: string } = {
  TEAM: "#cad9ff",
  SYSTEM: "#fafbce",
  GROUP: "#fbced3",
  SECRET: "#dccefb",
};

type PropsType = {
  roomType?: string;
  isMe?: boolean;
  text: string;
  sender?: string;
  sendTime: string;
};

const M_ChatTextItem: React.FC<PropsType> = ({
  roomType,
  isMe,
  text,
  sender,
  sendTime,
}) => {
  return (
    <li className={`${style.outerBox} ${isMe ? style.isMe : ""}`}>
      {isMe ? (
        <A_ChatText_TypeA
          background={roomType ? ENUM_BACKGROUND[roomType] : ""}
          text={text}
        />
      ) : (
        <>
          <A_ChatSenderImg
            senderImg={"https://picsum.photos/seed/picsum/200/300"}
          />
          <A_ChatText_TypeB text={text} sender={sender} />
        </>
      )}
      <A_ChatSendTime sendTime={sendTime} />
    </li>
  );
};

export default M_ChatTextItem;
