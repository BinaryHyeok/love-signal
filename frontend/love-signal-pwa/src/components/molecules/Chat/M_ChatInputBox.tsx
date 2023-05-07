import React, { useState, useRef } from "react";
import style from "./styles/M_ChatInputBox.module.scss";
import A_ChatInput from "../../atoms/Chat/A_ChatInput";
import A_ChatSendBtn from "../../atoms/Chat/A_ChatSendBtn";

type PropsType = {
  isDisabled: boolean;
  onTextSubmit: (text: string) => void;
};

const M_ChatInputBox: React.FC<PropsType> = ({ isDisabled, onTextSubmit }) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const textChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const textSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length > 0) {
      onTextSubmit(text);
      setText("");
    }
    inputRef.current?.focus();
  };

  return (
    <form className={style.chatInputBox} onSubmit={textSubmitHandler}>
      <A_ChatInput
        onChange={textChangeHanlder}
        text={text}
        isDisabled={isDisabled}
        inputRef={inputRef}
      />
      <A_ChatSendBtn />
    </form>
  );
};

export default M_ChatInputBox;
