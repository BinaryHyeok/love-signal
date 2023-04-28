import React from "react";
import style from "./Image_Type_A.module.scss";

//마이페이지, 회원가입에 쓸 이미지
const Image_Type_A = () => {
  //사진 업로드가 들어갈 함수입니다.
  const editMyPicture = () => {};
  return (
    <>
      <div className={style.imgBackGround}>
        <div className={style.imgBackGround2}>
          <img src="/assets/girl5.png" className={style.myImg} />
        </div>
        <img
          src="/assets/EditBtn.png"
          className={style.EditBtn}
          onClick={editMyPicture}
        />
      </div>
    </>
  );
};

export default Image_Type_A;
