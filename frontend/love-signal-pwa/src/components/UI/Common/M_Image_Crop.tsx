import { createRef, Dispatch, SetStateAction } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button_Type_A from "./Button_Type_A";
import style from "./M_Image_Crop.module.scss";
import M_Image_Crop_Desc from "./M_Image_Crop_Desc";

type PropsType = {
  image?: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  setCropData: Dispatch<SetStateAction<string>>;
  setMyImage: Dispatch<SetStateAction<FormData>>;
  setChangeImg: Dispatch<SetStateAction<boolean>>;
};

const M_Image_Crop: React.FC<PropsType> = ({
  image,
  setCropData,
  visible,
  setVisible,
  setMyImage,
  setChangeImg,
}) => {
  const cropperRef = createRef<ReactCropperElement>();

  const getCropdata = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const cropper = cropperRef.current?.cropper;
      const canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob);
          setMyImage(formData);
          setChangeImg(true);
        }
      }, "image/png");
      setVisible(!visible);
      setCropData(canvas.toDataURL());
    }
  };
  return (
    <div className={style.container}>
      <M_Image_Crop_Desc />
      <div className={style.cropper}>
        <Cropper
          style={{ height: "400px", width: "100%" }}
          src={image}
          ref={cropperRef}
          zoomTo={0.5}
          initialAspectRatio={1}
          viewMode={1}
          minCropBoxHeight={50}
          aspectRatio={0.7}
          minCropBoxWidth={50}
          background={true}
          responsive={false}
          autoCropArea={1}
          checkOrientation={true}
          guides={false}
        />
      </div>
      <div className={style.checkBtn}>
        <Button_Type_A
          className="dupleCheck"
          width="236px"
          height="32px"
          background="#FBCED3"
          onClick={getCropdata}
        >
          자르기
        </Button_Type_A>
      </div>
    </div>
  );
};

export default M_Image_Crop;
