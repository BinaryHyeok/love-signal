import React from "react";
import style from "./styles/A_TextHighlight.module.scss";

type PropsType = {
  children: any;
  color: string;
};

const ENUM_HIGHLIGHT_COLOR = {
  red: "#fb659f",
  blue: "#608dff",
};
Object.freeze(ENUM_HIGHLIGHT_COLOR);

const A_TextHighlight: React.FC<PropsType> = ({ children, color }) => {
  return <span className={style[color]}>{children}</span>;
};

export default A_TextHighlight;
