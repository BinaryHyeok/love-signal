import { contentVariants } from "../Common/contentVariants";
import style from "./styles/A_OtherTeamDesc.module.scss";
import { motion } from "framer-motion";

const A_OtherTeamDesc = () => {
  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      // exit="exit"
      className={style.description}
    >
      러브하우스에 함께 입주하고 싶은 <span className="text-red">이성팀</span>
      에게
      <br />
      <span className="text-red">초대 메세지</span>를 보내세요
    </motion.div>
  );
};

export default A_OtherTeamDesc;
