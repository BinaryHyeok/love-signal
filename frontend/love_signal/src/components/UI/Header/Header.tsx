import React from "react";
import style from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  //로고를 눌렀을때 이성팀 찾기 페이지로 이동합니다.
  const goMain = () => {
    navigate("/OtherGender");
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.logo}>
          <img src="/assets/logo2.png" onClick={goMain} />
        </div>
        <div className={style.logo}>
          <img src="/assets/Alarm.png" />
        </div>
      </div>
    </div>
  );
};

export default Header;
