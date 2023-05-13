import React from "react";
import style from "./styles/A_ChatSenderImg.module.scss";

type PropsType = {
  senderImg?: string;
  isSystem?: boolean;
};

const A_ChatSenderImg: React.FC<PropsType> = ({ senderImg, isSystem }) => {
  return (
    <div className={`${style.imgBox} ${isSystem ? style.systemMsg : ""}`}>
      <img src={senderImg} />
    </div>
  );
};

export default A_ChatSenderImg;
