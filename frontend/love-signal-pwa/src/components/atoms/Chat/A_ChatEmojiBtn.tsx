import React from "react";
import style from "./styles/A_ChatEmojiBtn.module.scss";

type PropsType = {
  isDisabled: boolean;
  onToggle: () => void;
};

const A_ChatEmojiBtn: React.FC<PropsType> = ({ isDisabled, onToggle }) => {
  return (
    <button className={style.btnBox} onClick={onToggle}>
      <img
        className={isDisabled ? style.disabled : ""}
        src={`${process.env.REACT_APP_ASSETS_DIR}/Emoji _love_.png`}
      />
    </button>
  );
};

export default A_ChatEmojiBtn;
