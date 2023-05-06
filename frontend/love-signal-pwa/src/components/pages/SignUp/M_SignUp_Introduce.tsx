import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc4 from "./A_SignUp_Desc4";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_A from "../../UI/Common/Button_Type_A";

type PropsType = {
  description: string;
  onClick: () => void;
  setDiscription: Dispatch<SetStateAction<string>>;
};

const M_SignUp_Introduce: React.FC<PropsType> = ({
  description,
  onClick,
  setDiscription,
}) => {
  const changeDiscription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setDiscription(target.value);
  };

  return (
    <div className={style.userInfo}>
      <A_SignUp_Desc4 />
      <div className={style.nickName}>
        <div>
          <Input_Type_A
            className="writeIntroduce"
            type="text"
            id="description"
            value={description}
            onChange={changeDiscription}
            placeholder={description}
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
          disabled={true}
        >
          회원가입
        </Button_Type_A>
      </div>
    </div>
  );
};

export default M_SignUp_Introduce;
