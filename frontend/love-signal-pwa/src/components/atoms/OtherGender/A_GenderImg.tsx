import React from "react";
import style from "./styles/A_GenderImg.module.scss";
import { member } from "../../../types/member";

type propsType = {
  index: number;
  members: member[];
};

const GenderImg: React.FC<propsType> = ({ index, members }) => {
  return (
    <div className={style.ImgBox}>
      <img
        key={index}
        src={members[index].profileImage}
        alt="이성이미지"
        className={style.humanPicture}
      />
    </div>
  );
};

export default GenderImg;
