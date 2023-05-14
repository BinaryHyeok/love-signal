import { Link } from "react-router-dom";
import style from "./styles/M_MainBtn.module.scss";
import { motion } from "framer-motion";

const MainBtn = () => {
  return (
    <motion.div
      whileTap={{
        scale: 1.2,
        transition: { type: "spring", stiffness: 200, damping: 10 },
      }}
      className={style.buttonBox}
    >
      <Link
        to={`${process.env.REACT_APP_API_AUTH}/auth/kakao/login`}
        className={style.link}
      >
        <img
          src={`${process.env.REACT_APP_ASSETS_DIR}/kakao2.png`}
          className={style.kakao}
        />
      </Link>
    </motion.div>
  );
};

export default MainBtn;
