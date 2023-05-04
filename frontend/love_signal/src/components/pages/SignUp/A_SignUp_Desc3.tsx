import React from "react";
import style from "./styles/SignUp.module.scss";

const A_SignUp_Desc3 = () => {
  return (
    <>
      <div className={style.text}>
        <span className={style.bold}>세번째 시그널,</span>
        <br />
        <br />
        자신이 <span className={style.bold}>태어난 년도</span>를 입력해주세요
        <br />
      </div>
    </>
  );
};

export default A_SignUp_Desc3;
