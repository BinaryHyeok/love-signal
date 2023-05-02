import React from "react";
import style from "./styles/M_ChatTopNotice.module.scss";

type PropsType = {
  className?: string;
  icon: string;
  text: string;
  width?: string;
  height?: string;
  background?: string;
  color?: string;
};

const M_ChatTopNotice: React.FC<PropsType> = ({
  className,
  icon,
  text,
  width,
  height,
  background,
  color,
}) => {
  return (
    <div
      className={`${style.noticeBox} ${className}`}
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

export default M_ChatTopNotice;
