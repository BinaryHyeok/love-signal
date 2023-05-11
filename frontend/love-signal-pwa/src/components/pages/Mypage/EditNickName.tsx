import React, { useState, useEffect } from "react";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import style from "./styles/NickName.module.scss";
import Mypage_Check_Btn from "../../UI/Common/MyPage_Check_Btn";

type propsType = {
  nickname: string;
  handleInfoUpdate: () => void;
};

const EditNickName: React.FC<propsType> = ({ nickname, handleInfoUpdate }) => {
  const [inivNick, setInitNick] = useState<string>("");

  useEffect(() => {
    setInitNick(nickname);
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    // setTmpNickName(target.value);
  };

  return (
    <div className={style.containerEdit}>
      {/* <div>닉네임</div> */}
      <div className={style.btnContainer}>
        <Input_Type_A
          type="text"
          value={inivNick}
          id="닉네임변경해."
          className="editNickName"
          onChange={changeHandler}
        />
        <div className={style.editBtn}>
          <Mypage_Check_Btn imgClick={handleInfoUpdate} />
        </div>
      </div>
    </div>
  );
};

export default EditNickName;
