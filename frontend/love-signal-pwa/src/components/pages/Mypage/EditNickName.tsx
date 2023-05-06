import React, { useState, Dispatch, SetStateAction } from "react";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import style from "./styles/NickName.module.scss";

type propsType = {
  nickname: string;
  changeName: Dispatch<SetStateAction<boolean>>;
  applyInfo: boolean;
  setApplyInfo: Dispatch<SetStateAction<boolean>>;
  setMyNickName: Dispatch<SetStateAction<string>>;
};

const EditNickName: React.FC<propsType> = ({
  nickname,
  changeName,
  applyInfo,
  setApplyInfo,
  setMyNickName,
}) => {
  const [tmpNickName, setTmpNickName] = useState<string>(nickname);
  const ApplyNickName = () => {
    changeName(true);
    setMyNickName(tmpNickName);
    setApplyInfo(!applyInfo);
  };

  const changeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setTmpNickName(target.value);
  };

  return (
    <div className={style.containerEdit}>
      <div>닉네임</div>
      <div>
        <Input_Type_A
          type="text"
          value={tmpNickName}
          id="닉네임변경해."
          className="writeNickName"
          onChange={changeNickName}
        />
      </div>
      <div>
        <Button_Type_A
          width="72px"
          height="32px"
          background="#FBCED3"
          onClick={ApplyNickName}
        >
          <img
            src="/assets/btn_check_violet.png"
            alt=""
            className={style.img}
          />
        </Button_Type_A>
      </div>
    </div>
  );
};

export default EditNickName;
