import React from "react";
import style from "./styles/O_ChatTextBox.module.scss";
import M_ChatTopNotice from "../../molecules/Chat/M_ChatTopNotice";
import O_ChatTextList from "./O_ChatTextList";
import M_ChatInputBox from "../../molecules/Chat/M_ChatInputBox";

type PropsType = {
  onTextSubmit(e: React.FormEvent<HTMLFormElement>): void;
  roomType?: string;
};

const O_ChatTextBox: React.FC<PropsType> = ({ onTextSubmit, roomType }) => {
  return (
    <div className={style.textContainer}>
      <M_ChatTopNotice
        icon="/assets/notice_A.png"
        text="매일 저녁 10시에는 선택의 시간이 진행됩니다."
        width="90%"
        background="rgba(197, 197, 197, 0.5)"
        className={style.topNotice}
      />
      <O_ChatTextList roomType={roomType} />
      <M_ChatInputBox
        onTextSubmit={onTextSubmit}
        isDisabled={roomType === "NOTICE" ? true : false}
      />
    </div>
  );
};

export default O_ChatTextBox;
