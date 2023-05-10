import { Link } from "react-router-dom";
import style from "./styles/M_MainBtn.module.scss";

const MainBtn = () => {
  return (
    <div className={style.buttonBox}>
      <Link
        to="http://k8b309.p.ssafy.io:9999/auth/kakao/login"
        className={style.link}
      >
        시작하기
      </Link>
    </div>
  );
};

export default MainBtn;
