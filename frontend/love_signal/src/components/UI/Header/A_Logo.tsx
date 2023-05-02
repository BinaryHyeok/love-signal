import { useNavigate } from "react-router-dom";
import style from "./A_Logo.module.scss";

const A_Logo = () => {
  const navigate = useNavigate();

  //로고를 눌렀을때 이성팀 찾기 페이지로 이동합니다.
  const goMain = () => {
    navigate("/OtherGender");
  };

  return (
    <div className={style.logo}>
      <img src="/assets/logo2.png" onClick={goMain} />
    </div>
  );
};

export default A_Logo;
