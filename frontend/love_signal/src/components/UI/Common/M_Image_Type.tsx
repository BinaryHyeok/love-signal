import { useState, createRef } from "react";
import style from "./M_Image_Type.module.scss";
import EditBtn from "./EditBtn";
import ProfileImg from "./ProfileImg";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button_Type_A from "./Button_Type_A";

type propsType = {
  myImg?: string;
};

//마이페이지, 회원가입에 쓸 이미지
const M_Image_Type: React.FC<propsType> = ({ myImg }) => {
  const publicUrl = process.env.PUBLIC_URL;
  const filesample = `${publicUrl}/assets/girl5.png`;
  //여기서 fileImg 시작이 filesample이 아닌 myImg가 들어갈것.
  const [fileImg, setFileImg] = useState<string>(filesample);

  const cropperRef = createRef<ReactCropperElement>();
  //크롭된 이미지
  const [cropData, setCropData] = useState<string>("#");

  const getCropdata = () => {
    // const Image = cropperRef?.current;
    // const cropper = Image?.cropper;
    // setCropData(cropper?.getCroppedCanvas().toDataURL());
    // console.log(typeof cropper?.getCroppedCanvas().toDataURL());
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const cropper = cropperRef.current?.cropper;
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
    console.log("!");
  };
  return (
    <>
      <div className={style.Container}>
        <div className={style.imgback}>
          <div className={style.imgBackGround}>
            <ProfileImg fileImg={fileImg} />
            <EditBtn setFileImg={setFileImg} />
          </div>
        </div>
        <Cropper src={fileImg} ref={cropperRef} />
        <Button_Type_A onClick={getCropdata}>자르기</Button_Type_A>
        <div>
          <img style={{ width: "100%" }} src={cropData} />
        </div>
      </div>
    </>
  );
};

export default M_Image_Type;
