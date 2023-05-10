import React from "react";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../../molecules/Chat/M_ChatItem";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { room } from "../../../types/room";
import { roomChatList } from "../../../types/chat";
import O_NoChatList from "./O_NoChatList";

type PropsType = {
  roomList: room[];
  chatList: roomChatList;
};

const O_ChatList: React.FC<PropsType> = ({ roomList, chatList }) => {
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
      {!(roomList.length > 0) && <O_NoChatList />}
      {roomList.length > 0 &&
        roomList.map((room) => (
          <M_ChatItem
            key={room.uuid}
            room={room}
            onClick={selectRoomHandler}
            lastChat={
              chatList[room.uuid] && chatList[room.uuid].length > 0
                ? chatList[room.uuid][chatList[room.uuid].length - 1]
                : {}
            }
            members={room.memberList}
          />
        ))}
    </ul>
  );
};

export default O_ChatList;
