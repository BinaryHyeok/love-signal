import style from "./styles/SignUp.module.scss";

const A_SignUp_Desc2 = () => {
  return (
    <div className={style.text}>
      <span className={style.bold}>두번째 시그널,</span>
      <br />
      <br />
      자신을 가장 잘 나타낼 수 있는
      <br />
      <span className={style.bold}>닉네임</span>을 설정해야합니다.
      <br />
    </div>
  );
};

export default A_SignUp_Desc2;
