import { isDisabled } from "@testing-library/user-event/dist/utils";
import style from "./styles/A_ChatInput.module.scss";

type PropsTypes = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  isDisabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

const A_ChatInput: React.FC<PropsTypes> = ({
  onChange,
  text,
  isDisabled,
  inputRef,
}) => {
  return (
    <input
      className={`${style.chatInput} ${isDisabled ? style.disabled : ""}`}
      value={text}
      onChange={onChange}
      disabled={isDisabled}
      placeholder={isDisabled ? "채팅이 불가한 채팅방입니다." : ""}
      ref={inputRef}
    />
  );
};

export default A_ChatInput;
