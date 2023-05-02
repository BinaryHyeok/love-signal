import React from "react";
import style from "./styles/M_ChatRoomHeader.module.scss";
import A_ChatHeaderTitle from "../../atoms/Chat/A_ChatHeaderTitle";
import A_ChatHeaderExit from "../../atoms/Chat/A_ChatHeaderExit";

type PropsType = {
  onRoomExit: React.MouseEventHandler<HTMLButtonElement>;
  roomId?: string;
  title?: string;
  count?: string;
  background?: string;
};

const M_ChatRoomHeader: React.FC<PropsType> = ({
  onRoomExit,
  roomId,
  title,
  count,
  background,
}) => {
  return (
    <div
      className={style.chatRoomHeader}
      style={
        background
          ? {
              background: background,
            }
          : {}
      }
    >
      <A_ChatHeaderExit onClick={onRoomExit} />
      <A_ChatHeaderTitle title={title} count={count} />
    </div>
  );
};

export default M_ChatRoomHeader;
