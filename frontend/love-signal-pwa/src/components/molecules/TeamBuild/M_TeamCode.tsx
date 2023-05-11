import A_Clipboard from "../../atoms/TeamBuild/A_Clipboard";
import A_CopyText from "../../atoms/TeamBuild/A_CopyText";
import style from "./styles/M_TeamCode.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

const M_TeamCode = () => {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  return (
    <motion.div className={style.container}>
      {isCopy && <A_CopyText>팀 코드가 클립보드에 복사되었습니다</A_CopyText>}
      {!isCopy && <A_CopyText>팀 코드를 공유해 팀원을 초대하세요 !</A_CopyText>}
      <A_Clipboard isCopy={isCopy} setIsCopy={setIsCopy} />
    </motion.div>
  );
};

export default M_TeamCode;
