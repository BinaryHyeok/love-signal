import React, { Dispatch, SetStateAction } from "react";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import style from "./styles/NickName.module.scss";

type propsType = {
  nickname: string;
  changeName: Dispatch<SetStateAction<boolean>>;
};

const NickName: React.FC<propsType> = ({ nickname, changeName }) => {
  const modifyNickName = () => {
    changeName(false);
  };
  return (
    <div className={style.container}>
      <div>닉네임</div>
      <span>{nickname}</span>
      <div>
        <Button_Type_A width="72px" height="32px" onClick={modifyNickName}>
          <img src="/assets/EditBtn.png" alt="" className={style.img} />
        </Button_Type_A>
      </div>
    </div>
  );
};

export default NickName;
