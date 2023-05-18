import style from "./styles/Desc.module.scss";

const A_SignUp_Desc3 = () => {
  return (
    <div className={style.text}>
      <span className={style.bold}>세번째 시그널,</span>
      <br />
      <br />
      자신의 <span className={style.bold}> 생년월일</span>를 입력해주세요
      <br />
    </div>
  );
};

export default A_SignUp_Desc3;
