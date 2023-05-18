import A_Heartline from "../../atoms/Common/A_Heartline";
import A_TextHighlight from "../../atoms/Common/A_TextHighlight";
import style from "./styles/M_Image_Crop_Desc.module.scss";

const M_Image_Crop_Desc = () => {
  return (
    <div className={style.container}>
      <A_Heartline type="red" count="3" />
      <div className={style.text}>
        <A_TextHighlight color="red">프로필 사진</A_TextHighlight> 등록
      </div>
      <A_Heartline type="red" count="3" />
    </div>
  );
};

export default M_Image_Crop_Desc;
