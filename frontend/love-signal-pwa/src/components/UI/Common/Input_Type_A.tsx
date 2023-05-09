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
}) => {
  return (
    <div style={{ width, margin }} className={style.container}>
      <input
        autoFocus
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`${style[className]}`}
        placeholder={placeholder}
        style={{ background }}
      />
    </div>
  );
};

export default Input_Type_A;
