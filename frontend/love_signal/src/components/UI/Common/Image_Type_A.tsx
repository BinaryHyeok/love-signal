import React, { useState } from "react";
import style from "./Image_Type_A.module.scss";
import ChangeImg from "../Modal/ChangeImg";

//마이페이지, 회원가입에 쓸 이미지
const Image_Type_A = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  //사진 업로드가 들어갈 함수입니다.
  const editMyPictureModal = () => {
    setOpenModal(true);
  };
  return (
    <>
      {openModal ? (
        <ChangeImg />
      ) : (
        <div className={style.Container}>
          <div className={style.imgback}>
            <div className={style.imgBackGround}>
              <div className={style.imgBackGround2}>
                <img src="/assets/girl5.png" className={style.myImg} />
              </div>
              <img
                src="/assets/EditBtn.png"
                className={style.EditBtn}
                onClick={editMyPictureModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Image_Type_A;
