import React from "react";
import style from "./styles/T_TeamBuildRoom.module.scss";

type PropsType = {
  children: any;
};

const T_TeamBuildRoom: React.FC<PropsType> = ({ children }) => {
  return <div className={style.container}>{children} </div>;
};

export default T_TeamBuildRoom;
