import { createRef, Dispatch, SetStateAction } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button_Type_A from "./Button_Type_A";
import style from "./M_Image_Crop.module.scss";
import M_Image_Crop_Desc from "./M_Image_Crop_Desc";
import { changeMyImg } from "../../../api/file";

type PropsType = {
  image?: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  cropData: string;
  setCropData: Dispatch<SetStateAction<string>>;
};

const M_Image_Crop: React.FC<PropsType> = ({
  image,
  cropData,
  setCropData,
  visible,
  setVisible,
}) => {
  const cropperRef = createRef<ReactCropperElement>();

  const getCropdata = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const cropper = cropperRef.current?.cropper;
      console.log(cropper.getImageData());
      const canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob);
          console.log(formData);
          console.log(formData.get("file"));
          changeMyImg("f6fc66c4-34cb-4f0d-ab89-34a974917654", formData);
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
