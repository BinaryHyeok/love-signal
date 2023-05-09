import React from "react";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../../molecules/Chat/M_ChatItem";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { room, roomMembers } from "../../../types/room";
import { roomChatList } from "../../../types/chat";

type PropsType = {
  roomList: room[];
  chatList: roomChatList;
  memberList: roomMembers;
};

const O_ChatList: React.FC<PropsType> = ({
  roomList,
  chatList,
  memberList,
}) => {
  const [_, setSelectedRoom] = useRecoilState<room>(roomInfo);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);

  const selectRoomHandler = (e: React.MouseEvent<HTMLElement>): void => {
    roomList.forEach((room) => {
      if (room.uuid === e.currentTarget.id) {
        setSelectedRoom(JSON.parse(JSON.stringify(room)));
      }
    });
    setFooterIsOn(false);
  };

  return (
    <ul className={style.chatList}>
      {roomList.map((room) => (
        <M_ChatItem
          key={room.uuid}
          room={room}
          onClick={selectRoomHandler}
          lastChat={chatList}
          members={memberList[room.uuid]}
        />
      ))}
    </ul>
  );
};

export default O_ChatList;
