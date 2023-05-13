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

    getChatRoomList(UUID, atk, kID).then((res) => {
      const data: room[] = res.data;
      console.log(data);
      setRoomList(() => [...data]);
      data.forEach((room) => {
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
      clearStompClient();
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

      connectChatServer(selectedRoom.uuid);

      // 각 방의 채팅 목록 fetch
      fetchRoomChat(selectedRoom.uuid);
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

  const connectChatServer = async (roomUUID: string) => {
    const header = {};
    ws.connect(
      header,
      (frame: any) => {
        ws.subscribe("/sub/chat/room/" + roomUUID, (res: any) => {
          const message = JSON.parse(res.body);

          if (message.type === "RESULT") {
            fetchRoomChat(roomUUID);
          } else {
            setChatList((prevState) => {
              const prevList = prevState[roomUUID] || [];
              const newList = [...prevList, message];
              return {
                ...prevState,
                [roomUUID]: newList,
              };
            });
          }
        });

        publishChatMsg({
          type: "TOPIC",
          roomUUID: roomUUID,
          nickname: myNick,
          content: "",
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  const publishChatMsg = (newChat: chat) => {
    const header = {};
    ws.send("/pub/chat/message", header, JSON.stringify(newChat));
  };

  const fetchRoomChat = (roomUUID: string) => {
    console.log("룸 uuid " + roomUUID + "로 채팅 목록 조회");
    if (!roomUUID) return;

    getChatList(roomUUID, atk, kID).then((res) => {
      const chatData = res.data;
      setChatList((prevState) => {
        const newList = [...chatData];

        // const DUMMY_SELECT: selectOrShareInfo = {
        //   nicknames: [],
        //   profileUrls: [],
        //   isSelected: "F",
        // };
        // const DUMMY_CHAT: chat = {
        //   roomUUID: selectedRoom.uuid,
        //   nickname: "러브시그널",
        //   uuid: "100",
        //   type: "SELECT",
        //   createdDate: "2023-05-13T22:00:00",
        //   selectOrShareInfo: DUMMY_SELECT,
        //   content: "나 더미 선택",
        // };
        // selectedRoom.memberList?.forEach((item, idx) => {
        //   if (idx < 3) {
        //     DUMMY_SELECT.nicknames?.push(item.nickname);
        //     DUMMY_SELECT.profileUrls?.push(item.profileImage);
        //   }
        // });

        // newList.push(DUMMY_CHAT);
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
              onTextSend={publishChatMsg}
              members={selectedRoom.memberList || null}
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
