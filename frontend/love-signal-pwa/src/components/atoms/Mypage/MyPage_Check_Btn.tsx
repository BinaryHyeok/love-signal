import React from "react";
import style from "./styles/MyPage_Check_Btn.module.scss";
import { motion, AnimatePresence } from "framer-motion";

type propsType = {
  imgClick: () => void;
};

const Mypage_Check_Btn: React.FC<propsType> = ({ imgClick }) => {
  return (
    <AnimatePresence>
      <motion.img
        src={`${process.env.REACT_APP_ASSETS_DIR}/btn_check_violet.png`}
        className={style.EditBtn}
        onClick={imgClick}
        whileTap={{
          scale: 1.2,
          transition: { type: "spring", stiffness: 200, damping: 10 },
        }}
      />
    </AnimatePresence>
  );
};

export default Mypage_Check_Btn;
