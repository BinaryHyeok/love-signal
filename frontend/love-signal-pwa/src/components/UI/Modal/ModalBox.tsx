import ExitImg from "./ExitImg";
import style from "./ModalBox.module.scss";
import { motion } from "framer-motion";

type propsType = {
  width: string;
  height: string;
  closeModal: () => void;
  children: any;
};

const ModalBox: React.FC<propsType> = ({
  width,
  height,
  closeModal,
  children,
}) => {
  return (
    <motion.div
      className={style.modal}
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
      initial={{
        opacity: 0,
        scale: 0.6,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          ease: "easeOut",
          duration: 0.3,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.6,
        transition: {
          ease: "easeIn",
          duration: 0.7,
        },
      }}
    >
      <ExitImg closeModal={closeModal} />
      <div>{children}</div>
    </motion.div>
  );
};

export default ModalBox;
