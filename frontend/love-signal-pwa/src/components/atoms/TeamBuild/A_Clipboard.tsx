import { useRecoilState } from "recoil";
import { myTeamUUID } from "../../../atom/member";
import copy from "clipboard-copy";
import style from "./styles/A_Clipboard.module.scss";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropsType = {
  test: number;
  setTest: Dispatch<SetStateAction<number>>;
  isCopy: boolean;
  setIsCopy: Dispatch<SetStateAction<boolean>>;
  isView: boolean;
  setIsView: Dispatch<SetStateAction<boolean>>;
};

let timeout: any = null;

const A_Clipboard: React.FC<PropsType> = ({
  test,
  setTest,
  isCopy,
  setIsCopy,
  isView,
  setIsView,
}) => {
  const [teamUUID] = useRecoilState<string>(myTeamUUID);
  const [start, setStart] = useState<boolean>(false);

  const copyToClipboard = (text: string) => {
    copy(text)
      .then(() => {
        console.log("텍스트 복사 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCopyClick = () => {
    copyToClipboard(teamUUID);
    setIsCopy(true);
    //처음 누를때, 일정시간 지나면 텍스트 없애줌
    if (isView && !start) {
      setStart(true);
      timeout = setTimeout(() => {
        setIsView(false);
      }, 5000);
      //이후에 누를 때, 일정시간 지나면 텍스트 없애줌
    } else if (!isView && start) {
      setIsView(true);
      setTest(Math.random());
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsView(false);
      }, 5000);
      //만약 이미 열려있는데 또 눌렀을 때,
    } else {
      setTest(Math.random());
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsView(false);
      }, 5000);
    }
  };

  return (
    <motion.div
      whileTap={{
        scale: 1.2,
        transition: { type: "spring", stiffness: 200, damping: 10 },
      }}
      className={style.container}
    >
      <img
        src={`${process.env.REACT_APP_ASSETS_DIR}/Team_Key.png`}
        onClick={handleCopyClick}
      />
    </motion.div>
  );
};

export default A_Clipboard;
