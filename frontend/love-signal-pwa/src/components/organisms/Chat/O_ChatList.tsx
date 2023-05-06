import React from "react";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../../molecules/Chat/M_ChatItem";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { room } from "../../../types/room";

type PropsType = {
  roomList: room[];
};

const O_ChatList: React.FC<PropsType> = ({ roomList }) => {
  const [_, setSelectedRoom] = useRecoilState(roomInfo);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);

  const selectRoomHandler = (e: React.MouseEvent<HTMLElement>): void => {
    roomList.forEach((room) => {
      if (room.UUID === e.currentTarget.id) {
        setSelectedRoom(JSON.parse(JSON.stringify(room)));
      }
    });
    setFooterIsOn(false);
  };

  return (
    <ul className={style.chatList}>
      {roomList.map((room) => (
        <M_ChatItem key={room.UUID} room={room} onClick={selectRoomHandler} />
      ))}
    </ul>
  );
};

export default O_ChatList;
