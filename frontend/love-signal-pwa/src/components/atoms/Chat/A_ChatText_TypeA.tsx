import React from "react";
import style from "./styles/A_ChatText_TypeA.module.scss";

type PropsType = {
  background: string;
  content?: string | JSX.Element;
  isContainer?: boolean;
};

const A_ChatText_TypeA: React.FC<PropsType> = ({
  background,
  content,
  isContainer,
}) => {
  return (
    <p
      className={`${style.text} ${isContainer ? style.container : ""}`}
      style={{ background: background }}
    >
      {content}
    </p>
  );
};

export default A_ChatText_TypeA;
