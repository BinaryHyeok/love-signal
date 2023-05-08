import React from "react";
import style from "./styles/M_ChatItem.module.scss";
import M_ChatItemImage from "./M_ChatItemImage";
import M_ChatItemContent from "./M_ChatItemContent";
import { room } from "../../../types/room";

type PropsType = {
  room: room;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const M_ChatItem: React.FC<PropsType> = ({ room, onClick }) => {
  console.log("렌더 룸 정보 : ", room);
  return (
    <li className={style.chatItem} id={room.uuid} onClick={onClick}>
      <M_ChatItemImage type={room.type} members={room.members} />
      <M_ChatItemContent
        room={room}
        showTimer={room.type === "SECRET" ? true : false}
      />
    </li>
  );
};

export default M_ChatItem;
