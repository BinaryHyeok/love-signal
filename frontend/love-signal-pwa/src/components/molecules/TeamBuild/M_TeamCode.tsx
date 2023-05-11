import A_Clipboard from "../../atoms/TeamBuild/A_Clipboard";
import A_CopyText from "../../atoms/TeamBuild/A_CopyText";
import style from "./styles/M_TeamCode.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

const M_TeamCode = () => {
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(true);
  const [test, setTest] = useState<number>(1);

  return (
    <motion.div className={style.container}>
      {isCopy && (
        <A_CopyText test={test} className={!isView ? `disappear` : ``}>
          팀 코드가 클립보드에 복사되었습니다
        </A_CopyText>
      )}
      {!isCopy && (
        <A_CopyText test={test} className="">
          팀 코드를 공유해 팀원을 초대하세요 !
        </A_CopyText>
      )}
      <A_Clipboard
        test={test}
        setTest={setTest}
        isCopy={isCopy}
        setIsCopy={setIsCopy}
        isView={isView}
        setIsView={setIsView}
      />
    </motion.div>
  );
};

export default M_TeamCode;
