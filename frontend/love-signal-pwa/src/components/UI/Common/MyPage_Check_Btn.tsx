import React from "react";
import style from "./MyPage_Check_Btn.module.scss";
import { motion } from "framer-motion";

type propsType = {
  imgClick: () => void;
};

const Mypage_Check_Btn: React.FC<propsType> = ({ imgClick }) => {
  return (
    <>
      <motion.img
        src="/assets/btn_check_violet.png"
        className={style.EditBtn}
        onClick={imgClick}
        whileTap={{ scale: 1.2 }}
      />
    </>
  );
};

export default Mypage_Check_Btn;
