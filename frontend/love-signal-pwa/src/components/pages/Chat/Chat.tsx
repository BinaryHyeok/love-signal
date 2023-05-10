import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import style from "./styles/Chat.module.scss";

import T_Chat from "../../templates/Chat/T_Chat";
import T_ChatRoom from "../../templates/Chat/T_ChatRoom";

import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { footerIdx } from "../../../atom/footer";
import { nickname } from "../../../atom/member";

import { inquireMember } from "../../../api/auth";
import { getChatRoomList } from "../../../api/room";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { chat, roomChatList } from "../../../types/chat";
import { room, roomMembers } from "../../../types/room";
import { getChatList } from "../../../api/chat";
import { member, userInfo } from "../../../types/member";

let socket: any;
let ws: any;

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomInfo);
  const [_, setIdx] = useRecoilState<number>(footerIdx);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);

  // test용 state
  const [userUUID, setUserUUID] = useState<string>(
    "882a9377-c1a6-4802-a0d8-2f310c004fed"
  );
  const [roomList, setRoomList] = useState<room[]>([]);
  const [roomMemberList, setRoomMemberList] = useState<roomMembers>({});
  const [chatList, setChatList] = useState<roomChatList>({});
  const [me, setMe] = useRecoilState<string>(nickname);

  useEffect(() => {
    socket = new SockJS("http://localhost:8080/ws-stomp");
    ws = Stomp.over(socket);

    // 더미 코드
    inquireMember(userUUID).then((res) => {
      setMe(res.data.body.nickname);
    });
    setMe("내 닉네임");

    getChatRoomList(userUUID).then((res) => {
      const data: room[] = res.data;
      console.log(res.data);
      setRoomList(() => [...data]);
      data.forEach((room) => {
        // 각 방에 소켓 연결
        console.log(`${room.uuid}방에 연결`);
        connectChatServer(room.uuid);

        // 각 방 참여 멤버 정보 fetch
        fetchRoomMembers(room);

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
      setSelectedRoom({ uuid: "" });
      setFooterIsOn(true);
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
        nickname: me, // 임시 닉네임
        content: "",
      });
    });
  };

  const publishChatMsg = (newChat: chat) => {
    const header = {};
    ws.send("/pub/chat/message", header, JSON.stringify(newChat));
  };

  const fetchRoomMembers = (roomInfo: room) => {
    if (!roomInfo.members || roomInfo.members.length === 0) return;

    roomInfo.members?.forEach((member) => {
      if (member.memberUUID) {
        inquireMember(member.memberUUID).then((res) => {
          const userInfo: userInfo = res.data.body;
          const newUser = {
            nickname: userInfo.nickname,
            age: userInfo.age,
            memberUUID: userInfo.memberUUID,
            description: userInfo.description,
            profileImage: userInfo.profileImage,
          };

          setRoomMemberList((prevState) => {
            const prevList = prevState[roomInfo.uuid] || [];
            const newList = [...prevList, newUser];

            return {
              ...prevState,
              [roomInfo.uuid]: newList,
            };
          });
        });
      }
    });
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

  const roomExitHandler = () => {
    setSelectedRoom({ uuid: "" });
    setFooterIsOn(true);
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
          count={selectedRoom.memberCount}
          roomExitHandler={roomExitHandler}
          roomType={selectedRoom.type}
          chatList={
            chatList[selectedRoom.uuid] &&
            chatList[selectedRoom.uuid].length > 0
              ? chatList[selectedRoom.uuid]
              : []
          }
          onTextSend={publishChatMsg}
          members={
            roomMemberList[selectedRoom.uuid] &&
            roomMemberList[selectedRoom.uuid].length > 0
              ? roomMemberList[selectedRoom.uuid]
              : []
          }
        />
      )}
      {!selectedRoom.uuid && (
        <div style={{ width: "100%" }}>
          <input
            type="text"
            value={userUUID}
            onChange={(e) => {
              setUserUUID(e.target.value);
            }}
          />
          <T_Chat
            roomList={roomList}
            chatList={chatList}
            memberList={roomMemberList}
          />
        </div>
      )}

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
