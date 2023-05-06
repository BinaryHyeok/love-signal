import React from "react";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../../molecules/Chat/M_ChatItem";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { room } from "../../../types/room";

const DUMMY_CHATLIST: room[] = [
  {
    id: "1",
    title: "남자방",
    memberCount: "3",
    lastMsgTime: "2023-05-01 11:39:27",
    type: "TEAM",
    members: [
      {
        nickname: "Tom",
        age: 22,
        description: "반가워요",
        profileImage:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Jimmy",
        age: 26,
        description: "Hellooooo",
        profileImage:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Mike",
        age: 31,
        description: "WeoWeoWeo",
        profileImage:
          "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    id: "2",
    title: "러브하우스",
    memberCount: "6",
    lastMsgTime: "2023-05-02 00:03:12",
    type: "GROUP",
    members: [
      {
        nickname: "Tom",
        age: 22,
        description: "반가워요",
        profileImage:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Jimmy",
        age: 26,
        description: "Hellooooo",
        profileImage:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Mike",
        age: 31,
        description: "WeoWeoWeo",
        profileImage:
          "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Tom",
        age: 22,
        description: "반가워요",
        profileImage:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Jimmy",
        age: 26,
        description: "Hellooooo",
        profileImage:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Mike",
        age: 31,
        description: "WeoWeoWeo",
        profileImage:
          "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    id: "3",
    title: "러브시그널",
    memberCount: "",
    lastMsgTime: "2023-05-01 23:59:59",
    type: "NOTICE",
  },
  {
    id: "4",
    title: "익명",
    memberCount: "2",
    lastMsgTime: "2023-05-01 12:03:12",
    type: "ANONYMOUS",
  },
];

type PropsType = {
  roomList: room[];
};

const O_ChatList: React.FC<PropsType> = ({ roomList }) => {
  const [_, setSelectedRoom] = useRecoilState(roomInfo);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);

  const selectRoomHandler = (e: React.MouseEvent<HTMLElement>): void => {
    DUMMY_CHATLIST.forEach((room) => {
      if (room.id === e.currentTarget.id) {
        setSelectedRoom(JSON.parse(JSON.stringify(room)));
      }
    });
    setFooterIsOn(false);
  };

  return (
    <ul className={style.chatList}>
      {roomList.map((room) => (
        <M_ChatItem key={room.id} room={room} onClick={selectRoomHandler} />
      ))}
      {/* {DUMMY_CHATLIST.map((room) => (
        <M_ChatItem key={room.id} room={room} onClick={selectRoomHandler} />
      ))} */}
    </ul>
  );
};

export default O_ChatList;
