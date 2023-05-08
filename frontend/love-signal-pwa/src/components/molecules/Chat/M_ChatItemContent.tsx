import React from "react";
import style from "./styles/M_ChatItemContent.module.scss";
import A_ChatItemInfo from "../../atoms/Chat/A_ChatItemInfo";
import A_ChatItemPreview from "../../atoms/Chat/A_ChatItemPreview";
import { room } from "../../../types/room";

type PropsType = {
  room: room;
  showTimer: boolean;
};

const M_ChatItemContent: React.FC<PropsType> = ({ room, showTimer }) => {
  return (
    <div className={style.contentBox}>
      <A_ChatItemInfo
        uuid={room.uuid}
        roomName={room.roomName}
        memberCount={room.memberCount}
        // lastMsgTime={room.lastMsgTime}
        showTimer={showTimer}
      />
      <A_ChatItemPreview />
    </div>
  );
};

export default M_ChatItemContent;
