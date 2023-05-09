import style from "./AlarmModal.module.scss";
import { motion } from "framer-motion";
import ExitImg from "./ExitImg";

import { useEffect } from "react";

type PropsType = {
  open: boolean;
  closeModal: () => void;
  children: any;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const AlarmModal: React.FC<PropsType> = ({ open, closeModal, children }) => {
  return (
    <motion.div
      animate={open ? "open" : "closed"}
      variants={sidebar}
      className={style.modal}
    >
      <ExitImg closeModal={closeModal} />
      <div>{children}</div>
    </motion.div>
  );
};

export default AlarmModal;
