import React from "react";
import style from "./styles/T_Chat.module.scss";
import M_Notice_Type_A from "../molecules/Notice_Type_A";
import O_ChatList from "../organisms/O_ChatList";

const T_Chat = () => {
  return (
    <div className={`${style.template_chat}`}>
      <M_Notice_Type_A
        icon="/assets/notice_A.png"
        text="매일 저녁 10시에는 선택의 시간이 진행됩니다."
        width="90%"
      />
      <O_ChatList />
    </div>
  );
};

export default T_Chat;
