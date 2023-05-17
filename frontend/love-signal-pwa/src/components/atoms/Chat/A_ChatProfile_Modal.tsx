import { Dispatch, SetStateAction } from "react";
import style from "./styles/A_ChatProfile_Modal.module.scss";
import { motion } from "framer-motion";
import ExitImg from "../Common/ExitImg";
import { useRecoilState } from "recoil";
import { alarmModalAnimation } from "../../../atom/alarm";

type PropsType = {
  closeModal: () => void;
  children: any;
};

const A_ChatProfile_Modal: React.FC<PropsType> = ({ closeModal, children }) => {
  const [animation] = useRecoilState<boolean>(alarmModalAnimation);
  return (
    <motion.div
      key="div"
      initial={{ y: "40%", opacity: 0, scale: 1 }}
      animate={{ y: "0", opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${style.container} ${animation ? `${style.disappear}` : ""}`}
    >
      <div className={style.profileImg}>dd</div>
      <div>{children}</div>
    </motion.div>
  );
};

export default A_ChatProfile_Modal;
