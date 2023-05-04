import React, { useEffect, useState, useRef } from "react";
import style from "./styles/T_ChatRoom.module.scss";
import M_ChatRoomHeader from "../../molecules/Chat/M_ChatRoomHeader";
import O_ChatTextBox from "../../organisms/Chat/O_ChatTextBox";
import { chat } from "../../../types/chat";

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

const DUMMY_CHAT_LIST: chat[] = [
  {
    isMe: true,
    text: "안녕하세요",
    sendTime: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    text: "반가워요~~",
    sender: "Tom",
    sendTime: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    text: "안녕하세요",
    sendTime: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    text: "반가워요~~",
    sender: "Tom",
    sendTime: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    text: "안녕하세요",
    sendTime: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    text: "반가워요~~",
    sender: "Tom",
    sendTime: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    text: "안녕하세요",
    sendTime: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    text: "반가워요~~",
    sender: "Tom",
    sendTime: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    text: "안녕하세요",
    sendTime: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    text: "반가워요~~",
    sender: "Tom",
    sendTime: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    text: "안녕하세요",
    sendTime: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    text: "반가워요~~",
    sender: "Tom",
    sendTime: "2023-04-30 12:02:12",
  },
];

const T_ChatRoom: React.FC<PropsType> = ({
  className,
  roomId,
  title,
  count,
  roomExitHandler,
  roomType,
}) => {
  const box_chatRoom = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const [chatList, setChatList] = useState<chat[]>([...DUMMY_CHAT_LIST]);

  useEffect(() => {
    const typeAdded = chatList.map((item) => ({
      ...item,
      roomType: roomType,
    }));
    setChatList([...typeAdded]);

    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight + 100;
    }
  }, [chatList]);

  const textSendHandler = (text: string) => {
    const now = new Date();
    const currTime = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}}}`;
    setChatList(() => [
      ...chatList,
      {
        isMe: true,
        text: text,
        sender: "Tom",
        sendTime: currTime,
      },
    ]);
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
      <O_ChatTextBox
        onTextSubmit={textSendHandler}
        roomType={roomType}
        ulRef={ulRef}
        chatList={chatList}
      />
    </div>
  );
};

export default T_ChatRoom;
