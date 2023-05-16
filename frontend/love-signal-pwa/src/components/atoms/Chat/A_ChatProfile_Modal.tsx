import style from "./styles/A_ChatProfile_Modal.module.scss";
import { motion } from "framer-motion";

const A_ChatProfile_Modal = () => {
  return (
    <div className={style.container}>
      <div className={style.profileContainer}></div>
      <div className={style.profileDesc}></div>
    </div>
  );
};

export default A_ChatProfile_Modal;
