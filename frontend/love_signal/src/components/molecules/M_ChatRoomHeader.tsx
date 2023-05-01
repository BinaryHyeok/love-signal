import React from "react";
import style from "./styles/M_ChatRoomHeader.module.scss";
import A_ChatHeaderTitle from "../atoms/A_ChatHeaderTitle";
import A_ChatHeaderExit from "../atoms/A_ChatHeaderExit";

type PropsType = {
  onRoomExit: React.MouseEventHandler<HTMLButtonElement>;
  roomId: string;
  count: string;
};

const M_ChatRoomHeader: React.FC<PropsType> = ({
  onRoomExit,
  roomId,
  count,
}) => {
  return (
    <div className={style.chatRoomHeader}>
      <A_ChatHeaderExit onClick={onRoomExit} />
      <A_ChatHeaderTitle title={roomId} count={count} />
    </div>
  );
};

export default M_ChatRoomHeader;
