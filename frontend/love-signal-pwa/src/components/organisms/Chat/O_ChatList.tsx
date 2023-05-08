import React from "react";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../../molecules/Chat/M_ChatItem";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { chatList } from "../../../atom/chat";
import { room } from "../../../types/room";
import { getChatList } from "../../../api/chat";

type PropsType = {
  roomList: room[];
};

const O_ChatList: React.FC<PropsType> = ({ roomList }) => {
  const [_, setSelectedRoom] = useRecoilState(roomInfo);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);
  const [___, setChatList] = useRecoilState(chatList);

  const selectRoomHandler = (e: React.MouseEvent<HTMLElement>): void => {
    console.log("selected Room uuid : " + e.currentTarget.id);
    roomList.forEach((room) => {
      if (room.uuid === e.currentTarget.id) {
        setSelectedRoom(JSON.parse(JSON.stringify(room)));
        getChatList(room.uuid).then((res) => {
          console.log(res.data);
          setChatList([...res.data]);
        });
      }
    });
    setFooterIsOn(false);
  };

  return (
    <ul className={style.chatList}>
      {roomList.map((room) => (
        <M_ChatItem key={room.uuid} room={room} onClick={selectRoomHandler} />
      ))}
    </ul>
  );
};

export default O_ChatList;
