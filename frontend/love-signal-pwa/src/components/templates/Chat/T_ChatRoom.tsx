import React, { useEffect, useState, useRef } from "react";
import style from "./styles/T_ChatRoom.module.scss";
import M_ChatRoomHeader from "../../molecules/Chat/M_ChatRoomHeader";
import O_ChatTextBox from "../../organisms/Chat/O_ChatTextBox";
import { chat } from "../../../types/chat";

import { Stomp, Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { useRecoilState } from "recoil";
import { chatList } from "../../../atom/chat";

const ENUM_BACKGROUND: { [key: string]: string } = {
  TEAM: "#cad9ff",
  SYSTEM: "#fafbce",
  MEETING: "#fbced3",
  SECRET: "#dccefb",
};

Object.freeze(ENUM_BACKGROUND);
type PropsType = {
  className?: string;
  roomId?: string;
  title?: string;
  count?: string;
  roomExitHandler: React.MouseEventHandler<HTMLElement>;
  roomType?: string;
  // chatList: chat[];
  // onTextSend: (text: string) => void;
};

const T_ChatRoom: React.FC<PropsType> = ({
  className,
  roomId,
  title,
  count,
  roomExitHandler,
  roomType,
  // chatList,
  // onTextSend,
}) => {
  const box_chatRoom = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const [unitHeight, setUnitHeight] = useState<number>();

  const socket = new SockJS("/ws-stomp");
  const ws = Stomp.over(socket);
  const [chat, setChatList] = useRecoilState(chatList);

  const connect = () => {
    console.log("방 입장 : ", roomId);
    ws.connect({}, (frame: any) => {
      ws.subscribe("/sub/chat/room" + roomId, (res) => {
        const messages = JSON.parse(res.body);
        console.log(messages);
      });

      // ws.send(
      //   "/pub/chat/message",
      //   {},
      //   JSON.stringify({
      //     type: "ENTER",
      //     roomId: roomId,
      //     nickname: "임시 닉네임",
      //     content: content,
      //   })
      // );
    });
  };
  connect();

  const textSendHandler = (content: string) => {
    if (content.trim().length < 1) return;

    const now = new Date();
    const currTime = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}}}`;
    setChatList(() => [
      ...chat,
      {
        // roomType: selectedRoom.type,
        // isMe: true,
        content: content,
        nickname: "Tom",
        createdDate: currTime,
      },
    ]);

    ws.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
        nickname: "임시 닉네임",
        content: content,
      })
    );
  };

  useEffect(() => {
    window.addEventListener("resize", unitHeightSetHandler);
    window.addEventListener("touchend", unitHeightSetHandler);
    window.visualViewport?.addEventListener(
      "resize",
      resizeVisualViewportHandler
    );

    return () => {
      window.removeEventListener("resize", unitHeightSetHandler);
      window.removeEventListener("touchend", unitHeightSetHandler);
      window.visualViewport?.removeEventListener(
        "resize",
        resizeVisualViewportHandler
      );
    };
  }, []);

  const unitHeightSetHandler = () => {
    let vh = window.visualViewport?.height;
    if (!vh) {
      vh = window.innerHeight * 0.01;
    } else {
      vh *= 0.01;
    }
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const resizeVisualViewportHandler = () => {
    const current = window.visualViewport?.height;
  };

  useEffect(() => {}, [unitHeight]);

  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight + 100;
    }
  }, [chatList]);

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
        // onTextSubmit={onTextSend}
        onTextSubmit={textSendHandler}
        roomType={roomType}
        ulRef={ulRef}
        // chatList={chatList}
        chatList={chat}
      />
    </div>
  );
};

export default T_ChatRoom;
