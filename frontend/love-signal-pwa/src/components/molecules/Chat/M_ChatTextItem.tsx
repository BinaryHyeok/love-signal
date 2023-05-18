import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/M_ChatTextItem.module.scss";
import A_ChatText_TypeA from "../../atoms/Chat/A_ChatText_TypeA";
import A_ChatText_TypeB from "../../atoms/Chat/A_ChatText_TypeB";
import A_ChatSendTime from "../../atoms/Chat/A_ChatSendTime";
import A_ChatSenderImg from "../../atoms/Chat/A_ChatSenderImg";
import A_ChatText_Notice from "../../atoms/Chat/A_ChatText_Notice";
import M_ChatText_Select from "./M_ChatText_Select";
import M_ChatText_Result from "./M_ChatText_Result";
import { chat, roomChatList } from "../../../types/chat";
import M_ChatText_Share from "./M_ChatText_Share";
import { member } from "../../../types/member";

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
  setChatList: React.Dispatch<React.SetStateAction<roomChatList>>;
  setOppositeTeamMember: Dispatch<SetStateAction<member[]>>;
  // setOppositeTeamUUID: Dispatch<SetStateAction<string>>;
  viewDetail: () => void;
};

const M_ChatTextItem: React.FC<PropsType> = ({
  roomType,
  chatType,
  isMe,
  profileImage,
  chat,
  setChatList,
  setOppositeTeamMember,
  // setOppositeTeamUUID,
  viewDetail,
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
        <A_ChatSenderImg
          senderImg={
            profileImage ||
            `${process.env.REACT_APP_ASSETS_DIR}/profile_notice.png`
          }
        />
        <A_ChatText_TypeB content={chat.content} nickname={chat.showNick} />
      </>
    );
  } else if (chatType && ["ENTER", "EXIT"].includes(chatType)) {
    text = <A_ChatText_Notice content={chat.content} />;
  } else if (chatType === "SELECT") {
    text = (
      <>
        <A_ChatSenderImg
          senderImg={`${process.env.REACT_APP_ASSETS_DIR}/profile_notice.png`}
          isSystem={true}
        />
        <M_ChatText_Select
          chat={chat}
          setChatList={setChatList}
          systemName={chat.nickname ? chat.nickname : ""}
          selectInfo={chat.selectOrShareInfo ? chat.selectOrShareInfo : {}}
        />
      </>
    );
  } else if (chatType === "RESULT") {
    text = (
      <>
        <A_ChatSenderImg
          senderImg={`${process.env.REACT_APP_ASSETS_DIR}/profile_notice.png`}
          isSystem={true}
        />
        <M_ChatText_Result
          systemName={chat.nickname ? chat.nickname : ""}
          selectInfo={chat.selectOrShareInfo ? chat.selectOrShareInfo : {}}
        />
      </>
    );
  } else if (chatType === "SHARE") {
    text = isMe ? (
      <M_ChatText_Share
        sender={chat.showNick ? chat.showNick : ""}
        selectInfo={chat.selectOrShareInfo ? chat.selectOrShareInfo : {}}
        isMe={isMe}
        setOppositeTeamMember={setOppositeTeamMember}
        chat={chat}
        viewDetail={viewDetail}
      />
    ) : (
      <>
        <A_ChatSenderImg senderImg={profileImage || ""} />
        <M_ChatText_Share
          sender={chat.nickname ? chat.nickname : ""}
          selectInfo={chat.selectOrShareInfo ? chat.selectOrShareInfo : {}}
          isMe={isMe || false}
          setOppositeTeamMember={setOppositeTeamMember}
          chat={chat}
          viewDetail={viewDetail}
        />
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
