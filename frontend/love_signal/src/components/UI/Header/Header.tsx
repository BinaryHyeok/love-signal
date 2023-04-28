import React from "react";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <div className={`${style.container} common-bg`}>
      <div className={style.content}>
        <div className={style.logo}>
          <img src="/assets/logo2.png" />
        </div>
        <div className={style.logo}>
          <img src="/assets/Alarm.png" />
        </div>
      </div>
    </div>
  );
};

export default Header;
