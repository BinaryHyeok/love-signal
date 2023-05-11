import React, { Dispatch, SetStateAction, useState } from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc1 from "./A_SignUp_Desc1";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import Button_Type_A from "../../UI/Common/Button_Type_A";

type PropsType = {
  onClick: () => void;
  setMyImage: Dispatch<SetStateAction<FormData>>;
};

const M_SignUp_Profile: React.FC<PropsType> = ({ onClick, setMyImage }) => {
  const [img] = useState<string>("/assets/simpleImg.png");
  const [changeImg, setChangeImg] = useState<boolean>(false);
  return (
    <>
      <div className={style.userInfo}>
        <A_SignUp_Desc1 />
        <div>
          <M_Image_Type
            marginTop="16px"
            myImg={img}
            setMyImage={setMyImage}
            setChangeImg={setChangeImg}
          />
        </div>
        <div className={style.checkBtn}>
          <Button_Type_A
            className="dupleCheck"
            width="236px"
            height="32px"
            background={changeImg ? "#FBCED3" : "#D9D9D9"}
            onClick={onClick}
            disabled={changeImg}
          >
            확인
          </Button_Type_A>
        </div>
      </div>
    </>
  );
};

export default M_SignUp_Profile;
