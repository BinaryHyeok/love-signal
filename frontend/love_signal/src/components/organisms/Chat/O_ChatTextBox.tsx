import React, { useEffect, useRef, useState } from "react";
import style from "./styles/O_ChatTextBox.module.scss";
import M_ChatTopNotice from "../../molecules/Chat/M_ChatTopNotice";
import O_ChatTextList from "./O_ChatTextList";
import M_ChatInputBox from "../../molecules/Chat/M_ChatInputBox";

type PropsType = {
  onTextSubmit(e: React.FormEvent<HTMLFormElement>): void;
  roomType?: string;
};

const O_ChatTextBox: React.FC<PropsType> = ({ onTextSubmit, roomType }) => {
  const textContainer = useRef<HTMLDivElement>(null);
  const [orgListHeight, setOrgListHeight] = useState<number>(0);
  const [listHeight, setListHeight] = useState<number>(orgListHeight);

  useEffect(() => {
    const parentHeight = textContainer.current?.offsetHeight || 0;
    setOrgListHeight(parentHeight);
    setListHeight(parentHeight);
  }, []);

  const resizeChatListHeight = (newHeight: number) => {
    setListHeight(newHeight);
  };

  const handleFocusOut = () => {
    console.log(orgListHeight);
    // resizeChatListHeight(orgListHeight);
  };

  return (
    <div className={style.textContainer} ref={textContainer}>
      <M_ChatTopNotice
        icon="/assets/notice_A.png"
        text="매일 저녁 10시에는 선택의 시간이 진행됩니다."
        width="90%"
        background="rgba(197, 197, 197, 0.5)"
        doTimeCount={roomType === "ANONYMOUS" ? true : false}
        className={style.topNotice}
      />
      <O_ChatTextList
        roomType={roomType}
        resizeChatListHeight={resizeChatListHeight}
        height={listHeight}
        setOrgListHeight={setOrgListHeight}
      />
      <M_ChatInputBox
        onTextSubmit={onTextSubmit}
        isDisabled={roomType === "NOTICE" ? true : false}
        onFocusOut={handleFocusOut}
      />
    </div>
  );
};

export default O_ChatTextBox;
