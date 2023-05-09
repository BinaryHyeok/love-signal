import React from "react";
import style from "./MyPage_Edit_Btn.module.scss";
import { motion } from "framer-motion";

type propsType = {
  imgClick: () => void;
};

const Mypage_Edit_Btn: React.FC<propsType> = ({ imgClick }) => {
  return (
    <>
      <motion.img
        src="/assets/EditBtn.png"
        className={style.EditBtn}
        onClick={imgClick}
        whileTap={{
          scale: 1.2,
          transition: { type: "spring", stiffness: 200, damping: 10 },
        }}
      />
    </>
  );
};

export default Mypage_Edit_Btn;
