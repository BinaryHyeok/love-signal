import React from "react";
import style from "./styles/A_ChatSenderImg.module.scss";

type PropsType = {
  senderImg?: string;
};

const A_ChatSenderImg: React.FC<PropsType> = ({ senderImg }) => {
  return (
    <div className={style.imgBox}>
      <img src={senderImg} />
    </div>
  );
};

export default A_ChatSenderImg;
