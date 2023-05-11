import React, { useState, Dispatch, SetStateAction } from "react";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import style from "./styles/NickName.module.scss";
import Mypage_Check_Btn from "../../UI/Common/MyPage_Check_Btn";
import Age from "./Age";

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
      {/* <div>닉네임</div> */}
      <div className={style.btnContainer}>
        <Input_Type_A
          type="text"
          value={tmpNickName}
          id="닉네임변경해."
          className="editNickName"
          onChange={changeNickName}
        />
        <div className={style.editBtn}>
          <Mypage_Check_Btn imgClick={ApplyNickName} />
        </div>
      </div>
    </div>
  );
};

export default EditNickName;
