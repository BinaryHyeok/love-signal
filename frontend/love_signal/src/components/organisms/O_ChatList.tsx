import React from "react";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../molecules/M_ChatItem";
import { useRecoilState } from "recoil";
import { roomId } from "../../atom/chatRoom";
import { footerIsOn } from "../../atom/footer";

const O_ChatList = () => {
  const [_, setSelectedRoom] = useRecoilState(roomId);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);
  const selectRoomHandler = (e: React.MouseEvent<HTMLElement>): void => {
    setSelectedRoom(e.currentTarget.id);
    setFooterIsOn(false);
  };

  return (
    <ul className={style.chatList}>
      <M_ChatItem id="남자방" onClick={selectRoomHandler} />
      <M_ChatItem id="남자방" onClick={selectRoomHandler} />
      <M_ChatItem id="남자방" onClick={selectRoomHandler} />
      <M_ChatItem id="남자방" onClick={selectRoomHandler} />
      <M_ChatItem id="남자방" onClick={selectRoomHandler} />
      <M_ChatItem id="남자방" onClick={selectRoomHandler} />
      <M_ChatItem id="남자방" onClick={selectRoomHandler} />
      {/* <M_ChatItem id="8" onClick={selectRoomHandler} />
      <M_ChatItem id="9" onClick={selectRoomHandler} />
      <M_ChatItem id="10" onClick={selectRoomHandler} />
      <M_ChatItem id="11" onClick={selectRoomHandler} />
      <M_ChatItem id="12" onClick={selectRoomHandler} />
      <M_ChatItem id="13" onClick={selectRoomHandler} />
      <M_ChatItem id="14" onClick={selectRoomHandler} />
      <M_ChatItem id="15" onClick={selectRoomHandler} /> */}
    </ul>
  );
};

export default O_ChatList;
