import React from "react";
import style from "./EditBtnImg.module.scss";
import { motion } from "framer-motion";

type propsType = {
  imgClick: () => void;
};

const EditBtnImg: React.FC<propsType> = ({ imgClick }) => {
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

export default EditBtnImg;
