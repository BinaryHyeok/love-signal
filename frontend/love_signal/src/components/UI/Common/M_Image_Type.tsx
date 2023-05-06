import { useState, useEffect } from "react";
import style from "./M_Image_Type.module.scss";
import EditBtn from "./EditBtn";
import ProfileImg from "./ProfileImg";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CommonModal from "../../UI/Modal/CommonModal";
import M_Image_Crop from "./M_Image_Crop";

type propsType = {
  myImg?: string;
};

//마이페이지, 회원가입에 쓸 이미지
const M_Image_Type: React.FC<propsType> = ({ myImg }) => {
  const publicUrl = process.env.PUBLIC_URL;
  const filesample = `${publicUrl}/assets/girl5.png`;
  //여기서 fileImg 시작이 filesample이 아닌 myImg가 들어갈것.
  const [fileImg, setFileImg] = useState<string>(filesample);
  const [cropData, setCropData] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  //모달창이 닫혔을때 다시 입장하기 버튼을 클릭할수 있도록 의존성 추가.
  useEffect(() => {}, [visible]);

  return (
    <>
      {!visible && (
        <div className={style.Container}>
          <div className={style.imgback}>
            <div className={style.imgBackGround}>
              <ProfileImg fileImg={cropData} />
              <EditBtn
                setFileImg={setFileImg}
                visible={visible}
                setVisible={setVisible}
              />
            </div>
          </div>
        </div>
      )}
      {visible && (
        <Modal_portal>
          <CommonModal
            setVisible={setVisible}
            visible={visible}
            width="304px"
            height="600px"
          >
            <M_Image_Crop
              image={fileImg}
              cropData={cropData}
              setCropData={setCropData}
              visible={visible}
              setVisible={setVisible}
            />
          </CommonModal>
        </Modal_portal>
      )}
    </>
  );
};

export default M_Image_Type;
