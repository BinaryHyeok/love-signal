import React, { useEffect, useState, useRef } from "react";
import style from "./styles/EditIntroduce.module.scss";
import Mypage_Check_Btn from "../../atoms/Mypage/MyPage_Check_Btn";
import Input_Type_A from "../../atoms/Common/Input_Type_A";

type propsType = {
  description: string;
  setDesc: (param: string) => void;
  toggleMode: () => void;
  descSubmitHandler: (param: string) => void;
};

const EditIntroduce: React.FC<propsType> = ({
  description,
  setDesc,
  toggleMode,
  descSubmitHandler,
}) => {
  const [currDesc, setCurrDesc] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrDesc(description);
  }, []);

  const changeMyIntroduce = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (getByteLength(target.value) <= 40) {
      setCurrDesc(target.value);
    }
  };

  const getByteLength = (word: string) => {
    let len = 0;
    if (word === "") return len;
    for (let i = 0; i < word.length; i++)
      len += word.charCodeAt(i) > 128 ? 2 : 1;
    return len;
  };

  const updateDescHandler = () => {
    if (currDesc === description) {
      toggleMode();
      return;
    }

    descSubmitHandler(currDesc);
    setDesc(currDesc);
    toggleMode();
  };

  return (
    <div className={style.container}>
      <div className={style.desc}>
        <Input_Type_A
          type="text"
          value={currDesc}
          id="input-desc"
          className="editIntroduce"
          onChange={changeMyIntroduce}
          inputRef={inputRef}
        />
      </div>
      <div className={style.button}>
        <Mypage_Check_Btn imgClick={updateDescHandler} />
      </div>
    </div>
  );
};

export default EditIntroduce;
