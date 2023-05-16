import React, { useState, useEffect, useRef } from "react";
import Input_Type_A from "../../atoms/Common/Input_Type_A";
import style from "./styles/NickName.module.scss";
import Mypage_Check_Btn from "../../atoms/Mypage/MyPage_Check_Btn";
import { duplicateCheck } from "../../../api/auth";
import Age from "../../atoms/Mypage/Age";

type propsType = {
  age: number;
  mynickname: string;
  setNick: (param: string) => void;
  toggleMode: () => void;
  nickSubmitHandler: (param: string) => void;
};

const EditNickName: React.FC<propsType> = ({
  age,
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
    if (getByteLength(target.value) <= 16) {
      setCurrNick(target.value);
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
        <Age width="53px" age={age} />
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
