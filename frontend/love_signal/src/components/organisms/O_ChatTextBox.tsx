import React, { ReactNode } from "react";
import style from "./styles/O_ChatTextBox.module.scss";
import M_Notice_Type_A from "../molecules/Notice_Type_A";

type PropsType = {};

const O_ChatTextList: React.FC<PropsType> = () => {
  return (
    <div className={style.textContainer}>
      <M_Notice_Type_A
        icon="/assets/notice_A.png"
        text="매일 저녁 10시에는 선택의 시간이 진행됩니다."
        width="90%"
        background="rgba(197, 197, 197, 0.5"
        className={style.topNotice}
      />
    </div>
  );
};

export default O_ChatTextList;
