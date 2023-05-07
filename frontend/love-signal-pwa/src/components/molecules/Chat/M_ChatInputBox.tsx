import React, { useState, useRef, useEffect } from "react";
import style from "./styles/M_ChatInputBox.module.scss";
import A_ChatInput from "../../atoms/Chat/A_ChatInput";
import A_ChatSendBtn from "../../atoms/Chat/A_ChatSendBtn";
import A_ChatEmojiBtn from "../../atoms/Chat/A_ChatEmojiBtn";
import M_ChatEmojiTemplate from "./M_ChatEmojiTemplate";
import Modal_portal from "../../UI/Modal/Modal_portal";

type PropsType = {
  isDisabled: boolean;
  onTextSubmit: (text: string) => void;
};

const M_ChatInputBox: React.FC<PropsType> = ({ isDisabled, onTextSubmit }) => {
  const [text, setText] = useState("");
  const [emojiIsOpen, setEmojiIsOpen] = useState<boolean>(false);
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

  const toggleEmoji = () => {
    console.log(emojiIsOpen);
    if (emojiIsOpen) {
      setEmojiIsOpen(false);
    } else {
      setEmojiIsOpen(true);
    }
  };

  const emojiCloseHandler = () => {
    setEmojiIsOpen(false);
    console.log("click");
  };

  return (
    <form className={style.chatInputBox} onSubmit={textSubmitHandler}>
      {/* {emojiIsOpen && (
        <Modal_portal>
          <M_ChatEmojiTemplate
            isOpen={emojiIsOpen}
            handleClose={emojiCloseHandler}
          />
        </Modal_portal>
      )} */}
      <A_ChatInput
        onChange={textChangeHanlder}
        text={text}
        isDisabled={isDisabled}
        inputRef={inputRef}
      />
      {/* <A_ChatEmojiBtn onToggle={toggleEmoji} isDisabled={isDisabled} /> */}
      <A_ChatSendBtn isDisabled={isDisabled} />
    </form>
  );
};

export default M_ChatInputBox;
