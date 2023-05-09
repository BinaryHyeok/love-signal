import style from "./ListBoxWithImgTitle.module.scss";
import { motion } from "framer-motion";

const ListBoxWithImgTitle = (props: any) => {
  return (
    <motion.div
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

export default ListBoxWithImgTitle;
