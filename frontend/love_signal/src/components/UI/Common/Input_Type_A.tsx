import React from "react";
import style from "./Input_Type_A.module.scss";

type PropsType = {
  className?: string;
  type: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input_Type_A: React.FC<PropsType> = ({
  className = "",
  type,
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`${style[className]}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input_Type_A;
