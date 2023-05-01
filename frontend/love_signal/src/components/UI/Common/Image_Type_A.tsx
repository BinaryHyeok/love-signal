import React, { useState, useRef } from "react";
import style from "./Image_Type_A.module.scss";
import EditBtn from "./EditBtn";

//마이페이지, 회원가입에 쓸 이미지
const Image_Type_A = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const filesample = `${publicUrl}/assets/girl5.png`;
  const [fileImg, setFileImg] = useState(`${filesample}`);
  return (
    <>
      <div className={style.Container}>
        <div className={style.imgback}>
          <div className={style.imgBackGround}>
            <div className={style.imgBackGround2}>
              <img src={fileImg} className={style.myImg} />
            </div>
            <EditBtn fileImg={fileImg} setFileImg={setFileImg} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Image_Type_A;
