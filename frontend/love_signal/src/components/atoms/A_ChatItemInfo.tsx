import React from "react";
import style from "./styles/A_ChatItemInfo.module.scss";

const A_ChatItemInfo = () => {
  return (
    <div className={style.infoBox}>
      <div className={style.titleBox}>
        <span className={style.title}>남자방</span>
        <span className={style.count}>3</span>
      </div>
      <div className={style.time}>오전 10:15</div>
    </div>
  );
};

export default A_ChatItemInfo;
