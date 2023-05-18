import { useEffect } from "react";
import style from "./styles/ListBoxWithImgTitle.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import "./ListBoxTransForm.css";

let timeout: NodeJS.Timer;
// let delayTime : "";

const ListBoxWithImgTitle = (props: any) => {
  // const delay = () => {
  //   if (props.key % 5 === 0) {
  //     setTimeout(()=>{

  //     },500)
  //   }
  // };

  return (
    <motion.div
      whileTap={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 200, damping: 10 },
      }}
      className={`${style.listBox} ${props.type}-line box${props.idx}`}
    >
      <div className={style.titleBox}>{props.title}</div>
      {props.children}
    </motion.div>
  );
};

export default ListBoxWithImgTitle;
