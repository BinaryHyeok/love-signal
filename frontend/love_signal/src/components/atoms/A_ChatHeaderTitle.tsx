import React from "react";
import style from "./styles/A_ChatHeaderTitle.module.scss";

type PropsType = {
  title: string;
  count: string;
};

const A_ChatHeaderTitle: React.FC<PropsType> = ({ title, count }) => {
  return (
    <div className={style.headerTitle}>
      <span className={style.title}>{title}</span>
      <span className={style.count}>{count}</span>
    </div>
  );
};

export default A_ChatHeaderTitle;
