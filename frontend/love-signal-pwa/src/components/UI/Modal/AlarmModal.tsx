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
  const [isVisible, setIsVisible] = useRecoilState<boolean>(alarmModal);
  const [aninmation, setAnimation] = useRecoilState<boolean>(alarmModal);
  const setIsOpen = useSetRecoilState(modalState);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="div"
        initial={{ y: "-20%", opacity: 0, scale: 1 }}
        animate={{ y: "0", opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={style.modal}
      >
        <ExitImg closeModal={closeModal} />
        <div>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlarmModal;
