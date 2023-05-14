import style from "./styles/AlarmModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import ExitImg from "../../../atoms/Common/ExitImg";
import { useRecoilState } from "recoil";
import { alarmModalAnimation } from "../../../../atom/alarm";

type PropsType = {
  closeModal: () => void;
  children: any;
};

const AlarmModal: React.FC<PropsType> = ({ closeModal, children }) => {
  const [animation] = useRecoilState<boolean>(alarmModalAnimation);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="div"
        initial={{ y: "-20%", opacity: 0, scale: 1 }}
        animate={{ y: "0", opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`${style.modal} ${animation ? `${style.disappear}` : ""}`}
      >
        <ExitImg closeModal={closeModal} />
        <div>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlarmModal;
