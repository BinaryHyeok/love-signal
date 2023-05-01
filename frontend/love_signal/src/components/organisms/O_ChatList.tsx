import React from "react";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../molecules/M_ChatItem";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../atom/chatRoom";
import { footerIsOn } from "../../atom/footer";

const DUMMY_CHATLIST = [
  {
    id: "1",
    title: "남자방",
    memberCount: "3",
    type: "TEAM",
  },
  {
    id: "2",
    title: "미팅방",
    memberCount: "6",
    type: "GROUP",
  },
  {
    id: "3",
    title: "공지방",
    memberCount: "",
    type: "NOTICE",
  },
  {
    id: "4",
    title: "익명방",
    memberCount: "2",
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
          memberCount={room.memberCount}
          title={room.title}
          onClick={selectRoomHandler}
        />
      ))}
    </ul>
  );
};

export default O_ChatList;
