import React, { useEffect, useRef } from "react";
import style from "./styles/T_ChatRoom.module.scss";
import M_ChatRoomHeader from "../molecules/M_ChatRoomHeader";
import O_ChatTextList from "../organisms/O_ChatTextBox";

type PropsType = {
  className?: string;
  roomId: string;
  count: string;
  roomExitHandler: React.MouseEventHandler<HTMLElement>;
};

const T_ChatRoom: React.FC<PropsType> = ({
  className,
  roomId,
  count,
  roomExitHandler,
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
      />
      <O_ChatTextList onTextSubmit={textSubmitHandler} />
    </div>
  );
};

export default T_ChatRoom;
