import React from "react";
import style from "./styles/A_GenderImg.module.scss";
import { member } from "../../../types/member";

type propsType = {
  member: member;
};

const GenderImg: React.FC<propsType> = ({ member }) => {
  return (
    <div className={style.ImgBox}>
      <img
        src={member.profileImage}
        alt="이성이미지"
        className={style.humanPicture}
      />
    </div>
  );
};

export default GenderImg;
