import { useNavigate } from "react-router-dom";
import style from "./styles/M_MainBtn.module.scss";
import Button_Type_A from "../../UI/Common/Button_Type_A";

const MainBtn = () => {
  const navigate = useNavigate();
  const goToSignUpPage = () => {
    navigate("/SignUp");
  };
  return (
    <div className={style.buttonBox}>
      <Button_Type_A width="65%" height="3rem" onClick={goToSignUpPage}>
        시작하기
      </Button_Type_A>
    </div>
  );
};

export default MainBtn;
