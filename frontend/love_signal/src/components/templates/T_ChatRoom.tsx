import React, { useEffect, useRef } from "react";
import style from "./styles/T_ChatRoom.module.scss";
import M_ChatRoomHeader from "../molecules/M_ChatRoomHeader";
import O_ChatTextBox from "../organisms/O_ChatTextBox";

const ENUM_BACKGROUND: { [key: string]: string } = {
  TEAM: "#cad9ff",
  NOTICE: "#fafbce",
  ALL: "#fbced3",
  ANONYMOUS: "#dccefb",
};

Object.freeze(ENUM_BACKGROUND);
type PropsType = {
  className?: string;
  roomId: string;
  count: string;
  roomExitHandler: React.MouseEventHandler<HTMLElement>;
  roomType: string;
};

const T_ChatRoom: React.FC<PropsType> = ({
  className,
  roomId,
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
        count={count}
        background={ENUM_BACKGROUND[roomType]}
      />
      <O_ChatTextBox onTextSubmit={textSubmitHandler} roomType={roomType} />
    </div>
  );
};

export default T_ChatRoom;
