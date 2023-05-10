import React from "react";
import style from "./styles/M_ChatItemContent.module.scss";
import A_ChatItemInfo from "../../atoms/Chat/A_ChatItemInfo";
import A_ChatItemPreview from "../../atoms/Chat/A_ChatItemPreview";
import { room } from "../../../types/room";
import { chat } from "../../../types/chat";

type PropsType = {
  room: room;
  showTimer: boolean;
  lastChat: chat;
};

const M_ChatItemContent: React.FC<PropsType> = ({
  room,
  showTimer,
  lastChat,
}) => {
  return (
    <div className={style.contentBox}>
      <A_ChatItemInfo
        uuid={room.uuid}
        roomName={room.roomName}
        memberCount={room.members?.length + ""}
        lastMsgTime={lastChat?.createdDate}
        showTimer={showTimer}
      />
      <A_ChatItemPreview lastChat={lastChat} />
    </div>
  );
};

export default M_ChatItemContent;
