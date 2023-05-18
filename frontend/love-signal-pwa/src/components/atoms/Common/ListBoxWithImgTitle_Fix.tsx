import { useEffect } from "react";
import style from "./styles/ListBoxWithImgTitle.module.scss";
import { motion, AnimatePresence } from "framer-motion";
// import "./ListBoxTransForm.css";

const ListBoxWithImgTitle_Fix = (props: any) => {
  return (
    <motion.div
      key={props.key}
      whileTap={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 200, damping: 10 },
      }}
      className={`${style.listBox} ${props.type}-line`}
    >
      <div className={style.titleBox}>{props.title}</div>
      {props.children}
    </motion.div>
  );
};

export default ListBoxWithImgTitle_Fix;
