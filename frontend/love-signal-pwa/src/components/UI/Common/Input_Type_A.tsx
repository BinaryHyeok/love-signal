import React from "react";
import style from "./Input_Type.module.scss";

type PropsType = {
  className?: string;
  type: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
  background?: string;
  margin?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const Input_Type_A: React.FC<PropsType> = ({
  className = "",
  type,
  id,
  value,
  onChange,
  placeholder,
  width,
  margin,
  background,
  inputRef,
}) => {
  return (
    <div style={{ width, margin }} className={style.container}>
      <input
        autoFocus
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`input ${style[className]}`}
        placeholder={placeholder}
        style={{ background }}
        ref={inputRef}
      />
    </div>
  );
};

export default Input_Type_A;
