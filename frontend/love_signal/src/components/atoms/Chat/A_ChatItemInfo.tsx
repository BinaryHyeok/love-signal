import React from "react";
import style from "./styles/A_ChatItemInfo.module.scss";

type PropsType = {
  id: string;
  title: string;
  memberCount: string;
};

const A_ChatItemInfo: React.FC<PropsType> = ({ id, title, memberCount }) => {
  return (
    <div className={style.infoBox}>
      <div className={style.titleBox}>
        <span className={style.title}>{title}</span>
        <span className={style.count}>{memberCount}</span>
      </div>
      <div className={style.time}>오전 10:15</div>
    </div>
  );
};

export default A_ChatItemInfo;
