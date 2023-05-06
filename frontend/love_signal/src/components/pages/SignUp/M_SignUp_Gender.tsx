import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc5 from "./A_SignUp_Desc5";
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
  const changeGender = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    console.log(target);
  };
  return (
    <div className={style.userInfo}>
      <A_SignUp_Desc5 />
      <div className={style.nickName}>
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
