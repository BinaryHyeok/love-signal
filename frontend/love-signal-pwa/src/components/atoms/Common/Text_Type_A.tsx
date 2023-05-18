import React from "react";
import style from "./styles/Input_Type.module.scss";

type PropsType = {
  className?: string;
  type: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  width?: string;
  background?: string;
  margin?: string;
};

const Text_Type_A: React.FC<PropsType> = ({
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
      <textarea
        autoFocus
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

export default Text_Type_A;
