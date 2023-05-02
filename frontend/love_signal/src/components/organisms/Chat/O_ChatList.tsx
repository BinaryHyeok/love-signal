import React from "react";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../../molecules/Chat/M_ChatItem";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";

const DUMMY_CHATLIST = [
  {
    id: "1",
    title: "남자방",
    memberCount: "3",
    lastMsgTime: "2023-05-01 11:39:27",
    type: "TEAM",
  },
  {
    id: "2",
    title: "미팅방",
    memberCount: "6",
    lastMsgTime: "2023-05-02 00:03:12",
    type: "GROUP",
  },
  {
    id: "3",
    title: "공지방",
    memberCount: "",
    lastMsgTime: "2023-05-01 23:59:59",
    type: "NOTICE",
  },
  {
    id: "4",
    title: "익명방",
    memberCount: "2",
    lastMsgTime: "2023-05-01 12:03:12",
    type: "ANONYMOUS",
  },
];

const O_ChatList = () => {
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
      {DUMMY_CHATLIST.map((room) => (
        <M_ChatItem
          key={room.id}
          id={room.id}
          title={room.title}
          memberCount={room.memberCount}
          lastMsgTime={room.lastMsgTime}
          onClick={selectRoomHandler}
        />
      ))}
    </ul>
  );
};

export default O_ChatList;
