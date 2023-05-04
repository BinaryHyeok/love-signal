import React from "react";
import style from "./styles/SignUp.module.scss";

const A_SignUp_Desc1 = () => {
  return (
    <>
      <div className={style.text}>
        여러분은 입주 전, 해야할 일이 있습니다.
        <br />
        <br />
        <span className={style.bold}>첫번째 시그널,</span>
        <br />
        <br />
        자신을 잘 드러낼 수 있는
        <br />
        <span className={style.bold}>프로필 사진</span>을 등록해야합니다.
        <br />
      </div>
    </>
  );
};

export default A_SignUp_Desc1;
