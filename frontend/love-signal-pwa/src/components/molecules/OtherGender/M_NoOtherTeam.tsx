import { contentVariants } from "../../atoms/Common/contentVariants";
import style from "./styles/M_NoOtherTeam.module.scss";
import { motion } from "framer-motion";

const M_NoOtherTeam = () => {
  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      // exit="exit"
      className={style.noTeam}
    >
      조회된 팀이 없습니다.
    </motion.div>
  );
};

export default M_NoOtherTeam;
