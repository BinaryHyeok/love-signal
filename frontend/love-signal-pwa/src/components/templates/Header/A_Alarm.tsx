import style from "./styles/A_Logo.module.scss";
import { motion, AnimatePresence } from "framer-motion";

type PropsType = { onClick: () => void };

const A_Alarm: React.FC<PropsType> = ({ onClick }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={style.logo}
        whileTap={{
          scale: 1.15,
          transition: { type: "spring", stiffness: 200, damping: 10 },
        }}
        onClick={onClick}
      >
        <img src="/assets/alarm.png" alt="도움말" />
      </motion.div>
    </AnimatePresence>
  );
};

export default A_Alarm;
