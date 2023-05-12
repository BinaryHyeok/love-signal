import style from "./ListBoxWithImgTitle.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const ListBoxWithImgTitle = (props: any) => {
  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
};

export default ListBoxWithImgTitle;
