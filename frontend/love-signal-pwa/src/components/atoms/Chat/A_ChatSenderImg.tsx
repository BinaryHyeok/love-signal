import React from "react";
import style from "./styles/A_ChatSenderImg.module.scss";
import { motion } from "framer-motion";

type PropsType = {
  senderImg?: string;
  isSystem?: boolean;
};

const A_ChatSenderImg: React.FC<PropsType> = ({ senderImg, isSystem }) => {
  return (
    <motion.div
      whileTap={{
        scale: 1.15,
        transition: { type: "spring", stiffness: 200, damping: 10 },
      }}
      className={`${style.imgBox} ${isSystem ? style.systemMsg : ""}`}
    >
      <img src={senderImg} />
    </motion.div>
  );
};

export default A_ChatSenderImg;
