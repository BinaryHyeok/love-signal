import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc5 from "./A_SignUp_Desc5";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import Text_Type_A from "../../UI/Common/Text_Type_A";

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
    if (getByteLength(target.value) <= 40) {
      setDiscription(target.value);
    }
  };

  //글자수 바이트 계산하는 함수입니다.
  const getByteLength = (word: string) => {
    let len = 0;
    if (word === "") return len;
    for (let i = 0; i < word.length; i++)
      len += word.charCodeAt(i) > 128 ? 2 : 1;
    return len;
  };

  return (
    <div className={style.userInfo}>
      <A_SignUp_Desc5 />
      <div className={style.nickName}>
        <div>
          <Text_Type_A
            className="signUpIntroduce"
            type="textarea"
            id="description"
            value={description}
            onChange={changeDiscription}
            placeholder="40Byte 제한입니다."
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
