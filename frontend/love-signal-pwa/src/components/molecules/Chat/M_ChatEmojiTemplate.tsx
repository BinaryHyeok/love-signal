import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import style from "./styles/M_ChatEmojiTemplate.module.scss";

type PropsType = {
  isOpen: boolean;
  handleClose: () => void;
};

const M_ChatEmojiTemplate: React.FC<PropsType> = ({ isOpen, handleClose }) => {
  return (
    <div
      className={`${style.emojiBox} ${isOpen ? style.isOpen : ""}`}
      // onBlur={onBlur}
    >
      <div className={style.backdrop} onClick={handleClose}></div>
      <div className={style.emoji}>
        <Picker data={data} onEmojiSelect={console.log} />
      </div>
    </div>
  );
};

export default M_ChatEmojiTemplate;
