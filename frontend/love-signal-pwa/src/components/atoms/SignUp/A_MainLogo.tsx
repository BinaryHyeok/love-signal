import React from "react";
import style from "./styles/A_MainLogo.module.scss";

const A_MainLogo = () => {
  return (
    <>
      <div className={style.logo}>
        <img
          src="/assets/logo.png"
          height="100vh"
          alt="로고"
          className={style.img}
        />
      </div>
    </>
  );
};

export default A_MainLogo;
