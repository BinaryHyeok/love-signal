import React from "react";
import style from "./styles/EditBtnImg.module.scss";
import { motion, AnimatePresence } from "framer-motion";

type propsType = {
  imgClick: () => void;
};

const EditBtnImg: React.FC<propsType> = ({ imgClick }) => {
  return (
    <AnimatePresence>
      <motion.img
        src={`${process.env.REACT_APP_ASSETS_DIR}/PhotoEditBtn.png`}
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

export default EditBtnImg;
