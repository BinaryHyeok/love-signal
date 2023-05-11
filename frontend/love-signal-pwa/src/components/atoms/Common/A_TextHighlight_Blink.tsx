import React from "react";
import style from "./styles/A_TextHighlight_Blink.module.scss";

type PropsType = {
  children: any;
  color: string;
  fontSize: string;
};

const ENUM_HIGHLIGHT_COLOR = {
  red: "#fb659f",
  blue: "#608dff",
};
Object.freeze(ENUM_HIGHLIGHT_COLOR);

const A_TextHighlight_Blink: React.FC<PropsType> = ({
  fontSize,
  children,
  color,
}) => {
  return (
    <span
      className={`${style[color]} ${style.common}`}
      style={{ fontSize: `${fontSize}` }}
    >
      {children}
    </span>
  );
};

export default A_TextHighlight_Blink;
