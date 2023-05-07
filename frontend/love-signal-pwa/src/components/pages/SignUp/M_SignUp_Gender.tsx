import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc4 from "./A_SignUp_Desc4";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import Input_Type_C from "./Input_Type_C";

type propsType = {
  gender: string;
  onClick: () => void;
  setGender: Dispatch<SetStateAction<string>>;
};

const M_SignUp_Gender: React.FC<propsType> = ({
  gender,
  onClick,
  setGender,
}) => {
  return (
    <div className={style.userInfo}>
      <A_SignUp_Desc4 />
      <div className={style.gender}>
        <Input_Type_C gender={gender} setGender={setGender} />
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
  );
};

export default M_SignUp_Gender;
