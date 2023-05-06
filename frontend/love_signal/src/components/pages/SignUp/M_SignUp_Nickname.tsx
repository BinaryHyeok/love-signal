import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc2 from "./A_SignUp_Desc2";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_A from "../../UI/Common/Button_Type_A";

type PropsType = {
  nickname: string;
  onClick1: () => void;
  onClick2: () => void;
  setNickname: Dispatch<SetStateAction<string>>;
  setCheckNickname: Dispatch<SetStateAction<boolean>>;
};

const M_SignUp_Nickname: React.FC<PropsType> = ({
  nickname,
  onClick1,
  onClick2,
  setNickname,
  setCheckNickname,
}) => {
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length <= 8) {
      setNickname(target.value);
      setCheckNickname(false); //바뀌면 바로 false로 바꿔줘.
    }
  };
  return (
    <div className={style.userInfo}>
      <A_SignUp_Desc2 />
      <div className={style.nickName}>
        <div>
          <Input_Type_A
            className="writeNickName"
            type="text"
            id="nickName"
            value={nickname}
            onChange={handleChangeNickname}
            placeholder="닉네임은여덟글자"
          />
        </div>
        <div>
          <Button_Type_A
            className="dupleCheck"
            width="80px"
            height="32px"
            background="#FBCED3"
            onClick={onClick1}
            // disabled={true}
          >
            중복확인
          </Button_Type_A>
        </div>
      </div>
      <div className={style.checkBtn}>
        <Button_Type_A
          className="dupleCheck"
          width="236px"
          height="32px"
          background="#FBCED3"
          onClick={onClick2}
        >
          확인
        </Button_Type_A>
      </div>
    </div>
  );
};

export default M_SignUp_Nickname;
