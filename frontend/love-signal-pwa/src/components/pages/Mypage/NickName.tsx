import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/NickName.module.scss";
import Mypage_Edit_Btn from "../../UI/Common/Mypage_Edit_Btn";
import A_TextHighlight from "../../atoms/Common/A_TextHighlight";

type propsType = {
  nickname: string;
  toggleMode: () => void;
};

const NickName: React.FC<propsType> = ({ nickname, toggleMode }) => {
  return (
    <div className={style.container}>
      {/* <div>닉네임</div> */}
      <div className={style.btnContainer}>
        <div className={style.nickname}>
          <A_TextHighlight color="red">{nickname}</A_TextHighlight>
        </div>
        <div className={style.editBtn}>
          <Mypage_Edit_Btn imgClick={toggleMode} />
        </div>
      </div>
    </div>
  );
};

export default NickName;
