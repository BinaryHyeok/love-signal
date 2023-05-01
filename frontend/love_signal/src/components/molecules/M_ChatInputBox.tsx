import React, { useState } from "react";
import style from "./styles/M_ChatInputBox.module.scss";
import A_ChatInput from "../atoms/Chat/A_ChatInput";
import A_ChatSendBtn from "../atoms/Chat/A_ChatSendBtn";

type PropsType = {
  onTextSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isDisabled: boolean;
};

const M_ChatInputBox: React.FC<PropsType> = ({ isDisabled }) => {
  const [text, setText] = useState("");

  const textChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const textSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
    setText("");
  };

  return (
    <form className={style.chatInputBox} onSubmit={textSubmitHandler}>
      <A_ChatInput
        onChange={textChangeHanlder}
        text={text}
        isDisabled={isDisabled}
      />
      <A_ChatSendBtn />
    </form>
  );
};

export default M_ChatInputBox;
