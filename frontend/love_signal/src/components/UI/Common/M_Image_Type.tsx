import { useState } from "react";
import style from "./M_Image_Type.module.scss";
import EditBtn from "./EditBtn";
import ProfileImg from "./ProfileImg";

type propsType = {
  myImg?: string;
};

//마이페이지, 회원가입에 쓸 이미지
const M_Image_Type: React.FC<propsType> = ({ myImg }) => {
  const publicUrl = process.env.PUBLIC_URL;
  const filesample = `${publicUrl}/assets/girl5.png`;
  //여기서 fileImg 시작이 filesample이 아닌 myImg가 들어갈것.
  const [fileImg, setFileImg] = useState<string>(filesample);
  return (
    <>
      <div className={style.Container}>
        <div className={style.imgback}>
          <div className={style.imgBackGround}>
            <ProfileImg fileImg={fileImg} />
            <EditBtn setFileImg={setFileImg} />
          </div>
        </div>
      </div>
    </>
  );
};

export default M_Image_Type;
