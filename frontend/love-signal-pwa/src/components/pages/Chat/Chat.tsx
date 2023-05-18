import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

import { contentVariants } from "../../atoms/Common/contentVariants";

import style from "./styles/Chat.module.scss";

import T_Chat from "../../templates/Chat/T_Chat";
import T_ChatRoom from "../../templates/Chat/T_ChatRoom";

import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { footerIdx } from "../../../atom/footer";
import { kid, myMemberUUID, myatk, nickname } from "../../../atom/member";

import { getChatRoomList } from "../../../api/room";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { chat, roomChatList, selectOrShareInfo } from "../../../types/chat";
import { room } from "../../../types/room";
import { getChatList } from "../../../api/chat";

import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";

let socket: any;
let ws: any;

const RANDOM_ANIMAL = [
  "판다",
  "고양이",
  "강아지",
  "미어캣",
  "몽구스",
  "펭귄",
  "다람쥐",
  "햄스터",
];

let intervalFunc: NodeJS.Timer;
const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomInfo);
  const [_, setIdx] = useRecoilState<number>(footerIdx);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);
  const [myNick, ___] = useRecoilState(nickname);

  const [roomList, setRoomList] = useState<room[]>([]);
  const [chatList, setChatList] = useState<roomChatList>({});

  const [UUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  useEffect(() => {
    initStompClient();

    chatInfoFetchHandler();
    intervalFunc = setInterval(chatInfoFetchHandler, 10000);

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
      clearStompClient();
      clearInterval(intervalFunc);
    };
  }, []);

  useEffect(() => {
    if (!selectedRoom.uuid) {
      // 채팅방 들어가지 않았을 때
      clearStompClient();
    } else {
      // 채팅방에 들어갔을 때
      clearStompClient();
      initStompClient();

      connectChatServer(selectedRoom);

      // 각 방의 채팅 목록 fetch
      fetchRoomChat(selectedRoom);
    }
  }, [selectedRoom]);

  const initStompClient = () => {
    socket = new SockJS(`${process.env.REACT_APP_API}/ws-stomp`);
    ws = Stomp.over(socket);
  };

  const clearStompClient = () => {
    if (ws.connected) {
      ws.disconnect();
    }
  };

  const connectChatServer = async (room: room) => {
    const header = {};
    ws.connect(
      header,
      (frame: any) => {
        ws.subscribe("/sub/chat/room/" + room.uuid, (res: any) => {
          const message = JSON.parse(res.body);

          if (message.type === "RESULT") {
            fetchRoomChat(room);
          } else {
            setChatList((prevState) => {
              const prevList = prevState[room.uuid] || [];
              if (room.type === "SECRET" && room.love === "F") {
                console.log(room);
                console.log(message);
                if (
                  message.nickname !== myNick &&
                  myNick === message.selectOrShareInfo?.selected
                ) {
                  message.nickname = room.roomName;
                } else {
                  message.nickname = room.roomName;
                }
              }

              const newList = [...prevList, message];
              return {
                ...prevState,
                [room.uuid]: newList,
              };
            });
          }
        });

        publishChatMsg({
          type: "TOPIC",
          roomUUID: room.uuid,
          nickname: myNick,
          content: "",
        });
      },
      (err: any) => {}
    );
  };

  const publishChatMsg = (newChat: chat) => {
    const header = {};
    ws.send("/pub/chat/message", header, JSON.stringify(newChat));
  };

  const fetchRoomChat = (room: room) => {
    if (!room || !room.uuid) return;

    getChatList(room.uuid, atk, kID).then((res) => {
      const chatData = res.data;
      const formattedChatData =
        chatData && room.type === "SECRET"
          ? chatData.map((item: chat) => {
              if (item.nickname === myNick || room.love !== "F") {
                return item;
              }
              return { ...item, nickname: room.roomName };
            })
          : chatData;
      setChatList((prevState) => {
        const newList = [...formattedChatData];

        return {
          ...prevState,
          [room.uuid]: newList,
        };
      });
    });
  };

  const chatInfoFetchHandler = () => {
    getChatRoomList(UUID, atk, kID).then((res) => {
      const formattedRoomList: room[] = roomTitleFormatter(res.data);

      setRoomList(() => [...formattedRoomList]);
      formattedRoomList.forEach((room) => {
        // 각 방의 채팅 목록 fetch
        fetchRoomChat(room);
      });
    });
  };

  const roomTitleFormatter = (rooms: room[]) => {
    const formatted: room[] = rooms.map((room) => {
      if (room.type !== "SECRET") return room;
      room.roomName =
        room.selector?.nickname === myNick
          ? `${room.selected}님과의 시그널`
          : `${room.roomName}님과의 시그널`;
      return room;
    });

    return formatted;
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
    <ATKFilter>
      <GetMyInfo>
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          // exit="exit"
          className={`${style.container} ${
            selectedRoom.uuid ? style.expanded : ""
          }`}
        >
          {/* 채팅방 타입은 SYSTEM, TEAM, MEETING, SECRET, SIGNAL 나뉘어져 있음 */}
          {selectedRoom.uuid && (
            <T_ChatRoom
              className={`${
                selectedRoom.uuid ? "slide-in-enter" : ""
              } common-bg`}
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
              updatedDate={selectedRoom.updatedDate}
              setChatList={setChatList}
              onTextSend={publishChatMsg}
              members={selectedRoom.memberList || null}
              myNick={myNick}
            />
          )}
          {!selectedRoom.uuid && (
            <T_Chat roomList={roomList} chatList={chatList} />
          )}
        </motion.div>
      </GetMyInfo>
    </ATKFilter>
  );
};

export default Chat;
