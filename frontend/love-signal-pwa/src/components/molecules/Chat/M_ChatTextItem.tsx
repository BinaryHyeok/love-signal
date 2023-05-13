import React from "react";
import style from "./styles/M_ChatTextItem.module.scss";
import A_ChatText_TypeA from "../../atoms/Chat/A_ChatText_TypeA";
import A_ChatText_TypeB from "../../atoms/Chat/A_ChatText_TypeB";
import A_ChatSendTime from "../../atoms/Chat/A_ChatSendTime";
import A_ChatSenderImg from "../../atoms/Chat/A_ChatSenderImg";
import A_ChatText_Notice from "../../atoms/Chat/A_ChatText_Notice";
import M_ChatText_Select from "./M_ChatText_Select";
import M_ChatText_Result from "./M_ChatText_Result";
import { chat } from "../../../types/chat";

const ENUM_BACKGROUND: { [key: string]: string } = {
  TEAM: "#cad9ff",
  SYSTEM: "#fafbce",
  MEETING: "#fbced3",
  SECRET: "#dccefb",
};

type PropsType = {
  roomType?: string;
  chatType?: string;
  isMe?: boolean;
  profileImage?: string | null;
  chat: chat;
};

const M_ChatTextItem: React.FC<PropsType> = ({
  roomType,
  chatType,
  isMe,
  profileImage,
  chat,
}) => {
  let text = null;
  if (chatType === "TEXT") {
    text = isMe ? (
      <A_ChatText_TypeA
        background={roomType ? ENUM_BACKGROUND[roomType] : ""}
        content={chat.content}
      />
    ) : (
      <>
        <A_ChatSenderImg senderImg={profileImage || ""} />
        <A_ChatText_TypeB content={chat.content} nickname={chat.nickname} />
      </>
    );
  } else if (chatType && ["ENTER", "EXIT"].includes(chatType)) {
    text = <A_ChatText_Notice content={chat.content} />;
  } else if (chatType === "SELECT") {
    text = (
      <>
        <A_ChatSenderImg
          senderImg={`${"/assets"}/profile_notice.png`}
          isSystem={true}
        />
        <M_ChatText_Select
          systemName={chat.nickname ? chat.nickname : ""}
          selectInfo={chat.selectOrShareInfo ? chat.selectOrShareInfo : {}}
        />
      </>
    );
  } else if (chatType === "RESULT") {
    text = (
      <>
        <A_ChatSenderImg
          senderImg={`${"/assets"}/profile_notice.png`}
          isSystem={true}
        />
        <M_ChatText_Result
          systemName={chat.nickname ? chat.nickname : ""}
          selectInfo={chat.selectOrShareInfo ? chat.selectOrShareInfo : {}}
        />
        ;
      </>
    );
  }

  let sendTime = null;
  if (chatType && !["ENTER", "EXIT"].includes(chatType)) {
    sendTime = <A_ChatSendTime createdDate={chat.createdDate} />;
  }

  return (
    <li
      className={`${style.outerBox} ${isMe ? style.isMe : ""} ${
        chatType && (["ENTER", "EXIT"].includes(chatType) ? style.notice : "")
      }`}
    >
      {text}
      {sendTime}
    </li>
  );
};

export default M_ChatTextItem;
