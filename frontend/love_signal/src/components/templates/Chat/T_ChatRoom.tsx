import React, { useEffect, useRef } from "react";
import style from "./styles/T_ChatRoom.module.scss";
import M_ChatRoomHeader from "../../molecules/Chat/M_ChatRoomHeader";
import O_ChatTextBox from "../../organisms/Chat/O_ChatTextBox";

const ENUM_BACKGROUND: { [key: string]: string } = {
  TEAM: "#cad9ff",
  NOTICE: "#fafbce",
  GROUP: "#fbced3",
  ANONYMOUS: "#dccefb",
};

Object.freeze(ENUM_BACKGROUND);
type PropsType = {
  className?: string;
  roomId?: string;
  title?: string;
  count?: string;
  roomExitHandler: React.MouseEventHandler<HTMLElement>;
  roomType?: string;
};

const T_ChatRoom: React.FC<PropsType> = ({
  className,
  roomId,
  title,
  count,
  roomExitHandler,
  roomType,
}) => {
  const box_chatRoom = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);

  const textSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <div className={`${style.chatRoom} ${className}`} ref={box_chatRoom}>
      <M_ChatRoomHeader
        onRoomExit={roomExitHandler}
        roomId={roomId}
        title={title}
        count={count}
        background={roomType ? ENUM_BACKGROUND[roomType] : ""}
      />
      <O_ChatTextBox onTextSubmit={textSubmitHandler} roomType={roomType} />
    </div>
  );
};

export default T_ChatRoom;
