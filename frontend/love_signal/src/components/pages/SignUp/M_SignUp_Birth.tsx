import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc3 from "./A_SignUp_Desc3";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_A from "../../UI/Common/Button_Type_A";

type PropsType = {
  birth: string;
  onClick: () => void;
  setBirth: Dispatch<SetStateAction<string>>;
};

const M_SignUp_Birth: React.FC<PropsType> = ({ birth, onClick, setBirth }) => {
  const changeBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setBirth(target.value);
  };
  return (
    <div className={style.userInfo}>
      <A_SignUp_Desc3 />
      <div className={style.nickName}>
        <div>
          <Input_Type_A
            className="writeBirth"
            type="text"
            id="birthYear"
            value={birth}
            onChange={changeBirth}
            placeholder="2023"
          />
        </div>
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

export default M_SignUp_Birth;
