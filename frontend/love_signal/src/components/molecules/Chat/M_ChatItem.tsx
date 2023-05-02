import React from "react";
import style from "./styles/M_ChatItem.module.scss";
import A_ChatItemImage from "../../atoms/Chat/A_ChatItemImage";
import M_ChatItemContent from "./M_ChatItemContent";

type PropsType = {
  id: string;
  title: string;
  memberCount: string;
  lastMsgTime?: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const M_ChatItem: React.FC<PropsType> = ({
  id,
  title,
  memberCount,
  lastMsgTime,
  onClick,
}) => {
  return (
    <li className={style.chatItem} id={id} title={title} onClick={onClick}>
      <A_ChatItemImage />
      <M_ChatItemContent
        id={id}
        memberCount={memberCount}
        title={title}
        lastMsgTime={lastMsgTime}
      />
    </li>
  );
};

export default M_ChatItem;
