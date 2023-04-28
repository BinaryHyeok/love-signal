import React from "react";
import style from "./styles/M_ChatItem.module.scss";
import A_ChatItemImage from "../atoms/A_ChatItemImage";
import M_ChatItemContent from "./M_ChatItemContent";

const M_ChatItem = () => {
  return (
    <li className={style.chatItem}>
      <A_ChatItemImage />
      <M_ChatItemContent />
    </li>
  );
};

export default M_ChatItem;
