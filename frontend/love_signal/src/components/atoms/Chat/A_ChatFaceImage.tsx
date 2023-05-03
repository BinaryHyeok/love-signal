import React from "react";
import style from "./styles/A_ChatFaceImage.module.scss";

type PropsType = {
  type: string;
};

const ENUM_EMAGES: { [key: string]: string } = {
  ANONYMOUS: "/assets/profile_anony.png",
  NOTICE: "/assets/profile_notice.png",
};

const A_ChatFaceImage: React.FC<PropsType> = ({ type }) => {
  return <img className={style.faceImage} src={ENUM_EMAGES[type]} />;
};

export default A_ChatFaceImage;
