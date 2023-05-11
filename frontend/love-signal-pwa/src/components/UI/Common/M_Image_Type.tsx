import { useState, useEffect, Dispatch, SetStateAction } from "react";
import style from "./M_Image_Type.module.scss";
import EditBtn from "./EditBtn";
import ProfileImg from "./ProfileImg";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CommonModal from "../../UI/Modal/CommonModal";
import M_Image_Crop from "./M_Image_Crop";

type propsType = {
  myImg: string;
  marginTop: string;
  setMyImage: Dispatch<SetStateAction<FormData>>;
  setChangeImg: Dispatch<SetStateAction<boolean>>;
};

let timeout: any = null;

//마이페이지, 회원가입에 쓸 이미지
const M_Image_Type: React.FC<propsType> = ({
  myImg,
  marginTop,
  setMyImage,
  setChangeImg,
}) => {
  // const publicUrl = process.env.PUBLIC_URL;
  // const filesample = `${publicUrl}/assets/girl5.png`;
  //여기서 fileImg 시작이 filesample이 아닌 myImg가 들어갈것.
  const [fileImg, setFileImg] = useState<string>(myImg);
  const [cropData, setCropData] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

  //모달창이 닫혔을때 다시 입장하기 버튼을 클릭할수 있도록 의존성 추가.
  useEffect(() => {}, [visible]);

  useEffect(() => {
    setCropData(myImg);
  }, [myImg]);

  return (
    <>
      {!visible && (
        <div className={style.Container} style={{ marginTop: `${marginTop}` }}>
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
            timeout={timeout}
            animation={animation}
            setAnimation={setAnimation}
            setVisible={setVisible}
            visible={visible}
            width="304px"
            height="600px"
          >
            <M_Image_Crop
              image={fileImg}
              setCropData={setCropData}
              visible={visible}
              setVisible={setVisible}
              setMyImage={setMyImage}
              setChangeImg={setChangeImg}
            />
          </CommonModal>
        </Modal_portal>
      )}
    </>
  );
};

export default M_Image_Type;
