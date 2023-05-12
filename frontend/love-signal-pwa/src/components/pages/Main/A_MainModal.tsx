import A_TextHighlight from "../../atoms/Common/A_TextHighlight";
import MainBtn from "../../molecules/Main/M_MainBtn";
import style from "./styles/A_MainModal.module.scss";
import { motion } from "framer-motion";

type PropsType = {
  animation: boolean;
};

const A_MainModal: React.FC<PropsType> = ({ animation }) => {
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0, scale: 1 }}
      animate={{ y: "0", opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${style.container} ${animation ? `${style.disappear}` : ""}`}
    >
      <div className={style.desc}>
        <div className={style.descs}>
          <A_TextHighlight color="red">러브시그널</A_TextHighlight>에 오신
          여러분
        </div>
        <div
          className={`${style.descs} ${style.bold}`}
          style={{ marginBottom: "24px" }}
        >
          진심으로 환영합니다.
        </div>
        <div className={style.descs}>
          <A_TextHighlight color="red">3일</A_TextHighlight>만에{" "}
          <A_TextHighlight color="red">사랑</A_TextHighlight>을 찾을 수
          있을까요?
        </div>
        <div className={style.descs}>
          두근두근 팀 소개팅{" "}
          <A_TextHighlight color="red">러브시그널</A_TextHighlight>
        </div>
        <div style={{ fontWeight: "700" }} className={style.descs}>
          지금 시작합니다.
        </div>
      </div>
      <MainBtn />
    </motion.div>
  );
};

export default A_MainModal;
