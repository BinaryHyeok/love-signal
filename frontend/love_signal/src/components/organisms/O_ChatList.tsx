import React from "react";
import { useNavigate } from "react-router";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../molecules/M_ChatItem";

const O_ChatList = () => {
  const navigate = useNavigate();

  const roomEnterHandler = (): void => {
    navigate("./10");
  };

  return (
    <ul className={style.chatList}>
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
      <M_ChatItem onClick={roomEnterHandler} />
    </ul>
  );
};

export default O_ChatList;
