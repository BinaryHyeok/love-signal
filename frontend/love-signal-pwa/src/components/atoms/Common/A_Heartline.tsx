import React from "react";
import style from "./styles/A_Heartline.module.scss";

type PropsType = {
  type: string;
  count: string;
};

const A_Heartline: React.FC<PropsType> = ({ type, count }) => {
  const hearts = [];
  const c = +count;
  for (let i = 0; i < c; i++) {
    hearts.push(
      <img
        key={i}
        src={`${process.env.REACT_APP_ASSETS_DIR}/${type}_heart.png`}
      />
    );
  }

  return <div className={style.line}>{hearts}</div>;
};

export default A_Heartline;
