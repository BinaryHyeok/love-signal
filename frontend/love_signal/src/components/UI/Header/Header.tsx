import React from "react";
import style from "./Header.module.scss";
import A_Logo from "./A_Logo";
import A_Alarm from "./A_Alarm";

const Header = () => {
  return (
    <div className={`${style.container} common-bg`}>
      <div className={style.content}>
        <A_Logo />
        <A_Alarm />
      </div>
    </div>
  );
};

export default Header;
