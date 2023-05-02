import React from "react";
import style from "./Header.module.scss";
import Logo from "./Logo";
import Alarm from "./Alarm";

const Header = () => {
  return (
    <div className={`${style.container} common-bg`}>
      <div className={style.content}>
        <Logo />
        <Alarm />
      </div>
    </div>
  );
};

export default Header;
