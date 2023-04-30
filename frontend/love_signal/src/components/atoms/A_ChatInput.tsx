import { useState } from "react";
import style from "./styles/A_ChatInput.module.scss";

type PropsTypes = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
};

const A_ChatInput: React.FC<PropsTypes> = ({ onChange, text }) => {
  return <input className={style.chatInput} value={text} onChange={onChange} />;
};

export default A_ChatInput;
