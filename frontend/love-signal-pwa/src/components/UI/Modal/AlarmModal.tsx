import style from "./AlarmModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import ExitImg from "./ExitImg";

type PropsType = {
  closeModal: () => void;
  children: any;
};

const AlarmModal: React.FC<PropsType> = ({ closeModal, children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal"
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        exit={{ y: "50%", opacity: 0, transition: { duration: 0.2 } }}
        className={style.modal}
      >
        <ExitImg closeModal={closeModal} />
        <div>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlarmModal;
