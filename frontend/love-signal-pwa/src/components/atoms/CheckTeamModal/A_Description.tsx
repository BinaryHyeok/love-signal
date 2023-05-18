import React from "react";
import style from "./styles/A_Description.module.scss";

type propsType = {
  description: string;
};

const A_Description: React.FC<propsType> = ({ description }) => {
  return <div className={style.description}>{description}</div>;
};

export default A_Description;
