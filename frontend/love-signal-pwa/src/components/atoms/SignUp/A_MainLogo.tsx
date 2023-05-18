import React from "react";
import style from "./styles/A_MainLogo.module.scss";

const A_MainLogo = () => {
  return (
    <>
      <div className={style.logo}>
        <img
          src={`${process.env.REACT_APP_ASSETS_DIR}/logo.png`}
          height="100vh"
          alt="로고"
          className={style.img}
        />
      </div>
    </>
  );
};

export default A_MainLogo;
