import React, { useState, useEffect } from "react";
import style from "./styles/T_Chat.module.scss";
import M_Notice_Type_A from "../../molecules/Chat/M_ChatTopNotice";
import O_ChatList from "../../organisms/Chat/O_ChatList";
import { room } from "../../../types/room";

type PropsType = {
  roomList: room[];
};

const T_Chat: React.FC<PropsType> = ({ roomList }) => {
  return (
    <div className={`${style.template_chat}`}>
      <M_Notice_Type_A
        icon="/assets/notice_A.png"
        text="매일 저녁 10시에는 선택의 시간이 진행됩니다."
        width="90%"
      />
      <O_ChatList roomList={roomList} />
    </div>
  );
};

export default T_Chat;
