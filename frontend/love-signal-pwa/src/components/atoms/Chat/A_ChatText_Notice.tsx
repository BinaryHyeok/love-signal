import React from "react";
import style from "./styles/A_ChatText_Notice.module.scss";

type PropsType = {
  content?: string;
};

const A_ChatText_Notice: React.FC<PropsType> = ({ content }) => {
  return <p className={style.text}>{content}</p>;
};

export default A_ChatText_Notice;
