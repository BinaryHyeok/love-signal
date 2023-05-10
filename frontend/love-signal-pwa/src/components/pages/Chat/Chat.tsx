import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import style from "./styles/Chat.module.scss";

import T_Chat from "../../templates/Chat/T_Chat";
import T_ChatRoom from "../../templates/Chat/T_ChatRoom";

import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { footerIdx } from "../../../atom/footer";
import { nickname } from "../../../atom/member";

import { getChatRoomList } from "../../../api/room";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { chat, roomChatList } from "../../../types/chat";
import { room } from "../../../types/room";
import { getChatList } from "../../../api/chat";

let socket: any;
let ws: any;

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomInfo);
  const [_, setIdx] = useRecoilState<number>(footerIdx);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);
  const [myNick, ___] = useRecoilState(nickname);

  // test용 state
  const [userUUID, setUserUUID] = useState<string>(
    "882a9377-c1a6-4802-a0d8-2f310c004fed"
  );
  const [roomList, setRoomList] = useState<room[]>([]);
  const [chatList, setChatList] = useState<roomChatList>({});

  useEffect(() => {
    socket = new SockJS(`${process.env.REACT_APP_API}/ws-stomp`);
    ws = Stomp.over(socket);

    getChatRoomList(userUUID).then((res) => {
      const data: room[] = res.data;
      console.log(res.data);
      setRoomList(() => [...data]);
      data.forEach((room) => {
        // 각 방에 소켓 연결
        console.log(`${room.uuid}방에 연결`);
        connectChatServer(room.uuid);

        // 각 방의 채팅 목록 fetch
        fetchRoomChat(room.uuid);
      });
    });

    setIdx(2);
    window.addEventListener("resize", unitHeightSetHandler);
    window.addEventListener("touchend", unitHeightSetHandler);
    window.visualViewport?.addEventListener(
      "resize",
      resizeVisualViewportHandler
    );

    return () => {
      roomExitHandler();
      window.removeEventListener("resize", unitHeightSetHandler);
      window.removeEventListener("touchend", unitHeightSetHandler);
      window.visualViewport?.removeEventListener(
        "resize",
        resizeVisualViewportHandler
      );
      // 웹 소켓 종료
      ws.disconnect();
    };
  }, []);

  const connectChatServer = async (roomUUID: string) => {
    const header = {};
    ws.connect(header, (frame: any) => {
      console.log("방 입장 : " + roomUUID);
      ws.subscribe("/sub/chat/room/" + roomUUID, (res: any) => {
        const messages = JSON.parse(res.body);

        setChatList((prevState) => {
          const prevList = prevState[roomUUID] || [];
          const newList = [...prevList, messages];
          return {
            ...prevState,
            [roomUUID]: newList,
          };
        });
      });

      publishChatMsg({
        type: "TOPIC",
        roomUUID: roomUUID,
        nickname: myNick,
        content: "",
      });
    });
  };

  const publishChatMsg = (newChat: chat) => {
    const header = {};
    ws.send("/pub/chat/message", header, JSON.stringify(newChat));
  };

  const fetchRoomChat = (roomUUID: string) => {
    console.log("룸 uuid " + roomUUID + "로 채팅 목록 조회");
    if (!roomUUID) return;

    getChatList(roomUUID).then((res) => {
      const chatData = res.data;
      setChatList((prevState) => {
        const prevList = prevState[roomUUID] || [];
        const newList = [...prevList, ...chatData];
        return {
          ...prevState,
          [roomUUID]: newList,
        };
      });
    });
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

  const roomExitHandler = (type?: number) => {
    setSelectedRoom({ uuid: "", memberList: [] });
    setFooterIsOn(true);

    if (type && type < 0) {
      // 만약 시간이 다돼서 자동으로 나가진 경우일 때, 알림 띄우는 로직
    }
  };

  return (
    <div
      className={`${style.container} ${
        selectedRoom.uuid ? style.expanded : ""
      }`}
    >
      {/* 채팅방 타입은 SYSTEM, TEAM, MEETING, SECRET, SIGNAL 나뉘어져 있음 */}
      {selectedRoom.uuid && (
        <T_ChatRoom
          className={`${selectedRoom.uuid ? "slide-in-enter" : ""} common-bg`}
          roomId={selectedRoom.uuid}
          title={selectedRoom.roomName}
          roomExitHandler={roomExitHandler}
          roomType={selectedRoom.type}
          chatList={
            chatList[selectedRoom.uuid] &&
            chatList[selectedRoom.uuid].length > 0
              ? chatList[selectedRoom.uuid]
              : []
          }
          onTextSend={publishChatMsg}
          members={selectedRoom.memberList || null}
        />
      )}
      {!selectedRoom.uuid && <T_Chat roomList={roomList} chatList={chatList} />}

      {/* <T_Chat />
      <T_ChatRoom
        className={`${selectedRoom.uuid ? "slide-in-enter" : ""} common-bg`}
        roomId={selectedRoom.uuid}
        title={selectedRoom.roomName}
        count={selectedRoom.memberCount}
        roomExitHandler={roomExitHandler}
        roomType={selectedRoom.type}
        // chatList={chat}
        // onTextSend={textSendHandler}
      /> */}
    </div>
  );
};

export default Chat;
