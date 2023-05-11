import style from "./AlarmModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import ExitImg from "./ExitImg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { alarmModal, modalState } from "../../../atom/alarm";

type PropsType = {
  closeModal: () => void;
  children: any;
};

const AlarmModal: React.FC<PropsType> = ({ closeModal, children }) => {
  const [isVisible] = useRecoilState<boolean>(alarmModal);
  const { animate } = useRecoilValue(modalState);
  const setIsOpen = useSetRecoilState(modalState);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="div"
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        // exit={{ y: "50%", opacity: 0, transition: { duration: 0.2 } }}
        className={style.modal}
      >
        <ExitImg closeModal={closeModal} />
        <div>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlarmModal;
