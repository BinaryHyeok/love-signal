import React, { useEffect, useRef, useState } from "react";
import style from "./styles/O_ChatTextBox.module.scss";
import M_ChatTopNotice from "../../molecules/Chat/M_ChatTopNotice";
import O_ChatTextList from "./O_ChatTextList";
import M_ChatInputBox from "../../molecules/Chat/M_ChatInputBox";
import { chat } from "../../../types/chat";
import { member } from "../../../types/member";

type PropsType = {
  onTextSubmit(text: string): void;
  roomType?: string;
  ulRef: React.RefObject<HTMLUListElement>;
  chatList: chat[];
};

const O_ChatTextBox: React.FC<PropsType> = ({
  onTextSubmit,
  roomType,
  ulRef,
  chatList,
}) => {
  return (
    <div className={style.textContainer}>
      <M_ChatTopNotice
        icon="/assets/notice_A.png"
        text="매일 저녁 10시에는 선택의 시간이 진행됩니다."
        width="90%"
        background="rgba(235, 235, 235, 0.8)"
        doTimeCount={roomType === "ANONYMOUS" ? true : false}
        className={style.topNotice}
      />
      <O_ChatTextList ulRef={ulRef} roomType={roomType} chatList={chatList} />
      <M_ChatInputBox
        onTextSubmit={onTextSubmit}
        isDisabled={roomType === "SYSTEM" ? true : false}
      />
    </div>
  );
};

export default O_ChatTextBox;
