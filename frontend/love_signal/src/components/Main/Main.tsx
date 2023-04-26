import style from "./Main.module.scss";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/Login");
  };
  const goToSignUpPage = () => {
    navigate("/SignUp");
  };
  return (
    <>
      <div className={`${style.MainContainer} diagonal-gradient`}>
        <div className={style.mainImg}>
          <img src="/assets/Main.png" />
        </div>
        <div className={style.buttonBox}>
          <button className={style.button} onClick={goToLoginPage}>
            Login
          </button>
          <button className={style.button} onClick={goToSignUpPage}>
            Join
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
