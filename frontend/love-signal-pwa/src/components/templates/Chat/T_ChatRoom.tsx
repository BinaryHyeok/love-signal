import React, { useEffect, useState, useRef } from "react";
import style from "./styles/T_ChatRoom.module.scss";
import M_ChatRoomHeader from "../../molecules/Chat/M_ChatRoomHeader";
import O_ChatTextBox from "../../organisms/Chat/O_ChatTextBox";
import { chat } from "../../../types/chat";

import { useRecoilState } from "recoil";
import { getChatList } from "../../../api/chat";
import { roomInfo } from "../../../atom/chatRoom";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { member } from "../../../types/member";

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
  me?: member;
};

let socket: any;
let ws: any;

const T_ChatRoom: React.FC<PropsType> = ({
  className,
  roomId,
  title,
  count,
  roomExitHandler,
  roomType,
  // chatList,
  // onTextSend,
  me,
}) => {
  const box_chatRoom = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const [unitHeight, setUnitHeight] = useState<number>();
  const [chatList, setChatList] = useState<chat[]>([]);

  const textSendHandler = (content: string) => {
    if (content.trim().length < 1) return;

    const now = new Date();
    const currTime = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}}}`;
    const newChat: chat = {
      // roomType: selectedRoom.type,
      // isMoe: true,
      type: "TEXT",
      roomUUID: roomId,
      nickname: "임시 닉네임",
      content: content,
      createdDate: currTime,
    };

    publishChatMsg(newChat);
    // setChatList(() => [...chatList, newChat]);
  };

  useEffect(() => {
    if (roomId != undefined && roomId != null) {
      socket = new SockJS("http://localhost:8080/ws-stomp");
      ws = Stomp.over(socket);
      // 채팅 서버 연결
      connectChatServer(roomId);

      // 채팅 목록 Fetch
      getChatList(roomId)
        .then((res) => {
          console.log(res.data);
          setChatList([...chatList, ...res.data]);
        })
        .catch((err) => {
          console.error(err);
        });
    }

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

  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight + 100;
    }
  }, [chatList]);

  const connectChatServer = async (roomUUID: string) => {
    const header = {};
    ws.connect(header, (frame: any) => {
      console.log("방 입장 : " + roomUUID);
      ws.subscribe("/sub/chat/room/" + roomUUID, (res: any) => {
        const messages = JSON.parse(res.body);
        console.log(messages);
        setChatList((prev) => [...prev, messages]);
      });

      publishChatMsg({
        type: "ENTER",
        roomUUID: roomUUID,
        nickname: "임시 닉네임",
        content: "",
      });
    });
  };

  const publishChatMsg = (newChat: chat) => {
    const header = {};
    ws.send("/pub/chat/message", header, JSON.stringify(newChat));
  };

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
        chatList={chatList}
        me={me}
      />
    </div>
  );
};

export default T_ChatRoom;
