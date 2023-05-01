import React from "react";
import style from "./GenderImg.module.scss";

type propsType = {
  index: number;
};

const GenderImg: React.FC<propsType> = ({ index }) => {
  return (
    <>
      <img
        key={index}
        src="/assets/girl1.png"
        alt="이성이미지"
        className={style.humanPicture}
      />
    </>
  );
};

export default GenderImg;
