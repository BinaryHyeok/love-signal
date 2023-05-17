import style from "./styles/AlarmModal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import ExitImg from "../../../atoms/Common/ExitImg";
import { useRecoilState } from "recoil";
import { alarmModalAnimation } from "../../../../atom/alarm";
import A_TextHighlight from "../../../atoms/Common/A_TextHighlight";

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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${style.modal} ${animation ? `${style.disappear}` : ""}`}
      >
        <ExitImg closeModal={closeModal} />
        <h3 className={style.title}>
          <A_TextHighlight color="red">러브시그널</A_TextHighlight> 설문
        </h3>
        <div>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlarmModal;
