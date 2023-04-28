import React from "react";
import style from "./styles/Chat.module.scss";
import T_Chat from "../templates/T_Chat";

const Chat = () => {
  return (
    <div className={style.container}>
      <T_Chat />
    </div>
  );
};

export default Chat;
