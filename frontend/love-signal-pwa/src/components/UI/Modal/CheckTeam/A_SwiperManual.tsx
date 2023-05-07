import style from "./A_SwiperManual.module.scss";

import { motion } from "framer-motion";

type propsType = {
  closeLeft: () => void;
};

const A_SwiperManual: React.FC<propsType> = ({ closeLeft }) => {
  return (
    <motion.div
      exit={{
        opacity: 0,
        scale: 0.6,
        transition: {
          ease: "easeOut",
          duration: 5,
        },
      }}
      className={style.swipeLeft}
      onClick={closeLeft}
    >
      <div className={style.swipeLetter}>
        <b>왼쪽</b>으로 넘기면
      </div>
      <div className={style.swipeLetter}>
        <b>다른 팀원</b>들을 볼 수 있어요
      </div>
      <div className={style.swipeLeftIcon}>
        <img src="/assets/swipe_left.png" alt="" />
      </div>
    </motion.div>
  );
};

export default A_SwiperManual;
