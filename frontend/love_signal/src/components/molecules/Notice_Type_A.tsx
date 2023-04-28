import React from "react";
import style from "./styles/M_Notice_Type_A.module.scss";

type PropsType = {
  icon: string;
  text: string;
  width?: string;
  height?: string;
  background?: string;
  color?: string;
};

const M_Notice_Type_A: React.FC<PropsType> = ({
  icon,
  text,
  width,
  height,
  background,
  color,
}) => {
  return (
    <div
      className={style.noticeBox}
      style={{
        width,
        height,
        background,
        color,
      }}
    >
      <img src={icon} />
      <span>{text}</span>
    </div>
  );
};

export default M_Notice_Type_A;
