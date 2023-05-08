import React from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc1 from "./A_SignUp_Desc1";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import Button_Type_A from "../../UI/Common/Button_Type_A";

type PropsType = {
  onClick: () => void;
};

const M_SignUp_Profile: React.FC<PropsType> = ({ onClick }) => {
  return (
    <>
      <div className={style.userInfo}>
        <A_SignUp_Desc1 />
        <div>
          <M_Image_Type marginTop="16px" />
        </div>
        <div className={style.checkBtn}>
          <Button_Type_A
            className="dupleCheck"
            width="236px"
            height="32px"
            background="#FBCED3"
            onClick={onClick}
          >
            확인
          </Button_Type_A>
        </div>
      </div>
    </>
  );
};

export default M_SignUp_Profile;
