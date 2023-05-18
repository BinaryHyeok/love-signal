import React from "react";
import style from "./styles/M_ChatItem.module.scss";
import M_ChatItemImage from "./M_ChatItemImage";
import M_ChatItemContent from "./M_ChatItemContent";
import { room } from "../../../types/room";
import { chat } from "../../../types/chat";
import { member } from "../../../types/member";

type PropsType = {
  room: room;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  lastChat: chat;
  members: member[] | undefined;
};

const M_ChatItem: React.FC<PropsType> = ({
  room,
  onClick,
  lastChat,
  members,
}) => {
  return (
    <li className={style.chatItem} id={room.uuid} onClick={onClick}>
      <M_ChatItemImage type={room.type} members={members} />
      <M_ChatItemContent
        room={room}
        showTimer={room.type === "SECRET" ? true : false}
        lastChat={lastChat}
      />
    </li>
  );
};

export default M_ChatItem;
