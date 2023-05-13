import React, { useState, useEffect, useRef } from "react";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import style from "./styles/NickName.module.scss";
import Mypage_Check_Btn from "../../atoms/Mypage/MyPage_Check_Btn";
import { duplicateCheck } from "../../../api/auth";

type propsType = {
  mynickname: string;
  setNick: (param: string) => void;
  toggleMode: () => void;
  nickSubmitHandler: (param: string) => void;
};

const EditNickName: React.FC<propsType> = ({
  mynickname,
  setNick,
  toggleMode,
  nickSubmitHandler,
}) => {
  const [currNick, setCurrNick] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrNick(mynickname);
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCurrNick(target.value);
  };

  const updateNickHandler = () => {
    if (currNick === mynickname) {
      toggleMode();
      return;
    }

    duplicateCheck(currNick)
      .then(() => {
        nickSubmitHandler(currNick);
        setNick(currNick);
        toggleMode();
      })
      .catch((err) => {
        inputRef.current?.focus();
        alert(err.response.data.message);
      });
  };

  return (
    <div className={style.containerEdit}>
      <div className={style.btnContainer}>
        <Input_Type_A
          type="text"
          value={currNick}
          id="input-nickname"
          className="editNickName"
          onChange={changeHandler}
          inputRef={inputRef}
        />
        <div className={style.editBtn}>
          <Mypage_Check_Btn imgClick={updateNickHandler} />
        </div>
      </div>
    </div>
  );
};

export default EditNickName;
