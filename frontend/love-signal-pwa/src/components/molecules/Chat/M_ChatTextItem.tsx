import React from "react";
import style from "./styles/M_ChatTextItem.module.scss";
import A_ChatText_TypeA from "../../atoms/Chat/A_ChatText_TypeA";
import A_ChatText_TypeB from "../../atoms/Chat/A_ChatText_TypeB";
import A_ChatSendTime from "../../atoms/Chat/A_ChatSendTime";
import A_ChatSenderImg from "../../atoms/Chat/A_ChatSenderImg";
import A_ChatText_Notice from "../../atoms/Chat/A_ChatText_Notice";
import M_ChatText_Select from "./M_ChatText_Select";
import M_ChatText_Result from "./M_ChatText_Result";

const ENUM_BACKGROUND: { [key: string]: string } = {
  TEAM: "#cad9ff",
  SYSTEM: "#fafbce",
  GROUP: "#fbced3",
  SECRET: "#dccefb",
};

type PropsType = {
  roomType?: string;
  type?: string;
  isMe?: boolean;
  content?: string;
  nickname?: string;
  createdDate?: string;
  profileImage?: string;
};

const M_ChatTextItem: React.FC<PropsType> = ({
  roomType,
  type,
  isMe,
  content,
  nickname,
  createdDate,
  profileImage,
}) => {
  let text = null;
  if (type === "TEXT") {
    text = isMe ? (
      <A_ChatText_TypeA
        background={roomType ? ENUM_BACKGROUND[roomType] : ""}
        content={content}
      />
    ) : (
      <>
        <A_ChatSenderImg senderImg={profileImage} />
        <A_ChatText_TypeB content={content} nickname={nickname} />
      </>
    );
  } else if (type && type in ["ENTER", "EXIT"]) {
    text = <A_ChatText_Notice content={content} />;
  } else if (type === "SELECT") {
    text = <M_ChatText_Select />;
  } else if (type === "RESULT") {
    text = <M_ChatText_Result />;
  }

  let sendTime = null;
  if (type && !(type in ["ENTER", "EXIT"])) {
    sendTime = <A_ChatSendTime createdDate={createdDate} />;
  }
  return (
    <li
      className={`${style.outerBox} ${isMe ? style.isMe : ""} ${
        type && (type in ["ENTER", "EXIT"] ? style.notice : "")
      }`}
    >
      {text}
      {sendTime}
    </li>
  );
};

export default M_ChatTextItem;
