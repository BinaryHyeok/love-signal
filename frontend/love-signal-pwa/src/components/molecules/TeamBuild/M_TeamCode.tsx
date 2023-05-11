import A_Clipboard from "../../atoms/TeamBuild/A_Clipboard";
import A_CopyText from "../../atoms/TeamBuild/A_CopyText";
import style from "./styles/M_TeamCode.module.scss";
import { motion } from "framer-motion";

const M_TeamCode = () => {
  return (
    <motion.div className={style.container}>
      <A_CopyText>팀 코드가 클립보드에 복사되었습니다</A_CopyText>
      <A_Clipboard />
    </motion.div>
  );
};

export default M_TeamCode;
