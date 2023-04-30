import React from "react";
import style from "./styles/M_ChatItem.module.scss";
import A_ChatItemImage from "../atoms/A_ChatItemImage";
import M_ChatItemContent from "./M_ChatItemContent";

type PropsType = {
  id: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const M_ChatItem: React.FC<PropsType> = ({ id, onClick }) => {
  return (
    <li className={style.chatItem} id={id} onClick={onClick}>
      <A_ChatItemImage />
      <M_ChatItemContent />
    </li>
  );
};

export default M_ChatItem;
