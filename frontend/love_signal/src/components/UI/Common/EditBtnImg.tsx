import React from "react";
import style from "./EditBtnImg.module.scss";

type propsType = {
  imgClick: () => void;
};

const EditBtnImg: React.FC<propsType> = ({ imgClick }) => {
  return (
    <>
      <img
        src="/assets/EditBtn.png"
        className={style.EditBtn}
        onClick={imgClick}
      />
    </>
  );
};

export default EditBtnImg;
