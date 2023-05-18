import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc5 from "../../atoms/SignUp/A_SignUp_Desc5";
import Button_Type_A from "../../atoms/Common/Button_Type_A";
import Text_Type_A from "../../atoms/Common/Text_Type_A";

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
  const changeDiscription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.value.length <= 20) {
      setDiscription(target.value);
    }
  };

  return (
    <div className={style.userInfo}>
      <A_SignUp_Desc5 />
      <div className={style.nickName}>
        <div className={style.introduce}>
          <Text_Type_A
            className="signUpIntroduce"
            type="textarea"
            id="description"
            value={description}
            onChange={changeDiscription}
            placeholder="20자 제한입니다."
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
          회원가입
        </Button_Type_A>
      </div>
    </div>
  );
};

export default M_SignUp_Introduce;
