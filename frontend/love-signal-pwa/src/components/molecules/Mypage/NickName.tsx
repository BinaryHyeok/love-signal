import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/NickName.module.scss";
import Mypage_Edit_Btn from "../../atoms/Mypage/Mypage_Edit_Btn";
import A_TextHighlight from "../../atoms/Common/A_TextHighlight";
import Age from "../../atoms/Mypage/Age";

type propsType = {
  age: number;
  mynickname: string;
  toggleMode: () => void;
};

const NickName: React.FC<propsType> = ({ age, mynickname, toggleMode }) => {
  return (
    <div className={style.container}>
      <div className={style.btnContainer}>
        <Age width="48px" age={age} />
        <div className={style.nickname}>
          <A_TextHighlight color="red">{mynickname}</A_TextHighlight>
        </div>
        <div className={style.editBtn}>
          <Mypage_Edit_Btn imgClick={toggleMode} />
        </div>
      </div>
    </div>
  );
};

export default NickName;
