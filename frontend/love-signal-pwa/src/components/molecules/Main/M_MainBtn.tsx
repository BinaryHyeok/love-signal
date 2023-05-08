import { Link } from "react-router-dom";
import style from "./styles/M_MainBtn.module.scss";

const MainBtn = () => {
  return (
    <div className={style.buttonBox}>
      <Link to="http://localhost:8888/sign-in" className={style.link}>
        시작하기
      </Link>
    </div>
  );
};

export default MainBtn;
