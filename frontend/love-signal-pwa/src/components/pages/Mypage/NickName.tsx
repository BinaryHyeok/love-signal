import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/NickName.module.scss";
import Mypage_Edit_Btn from "../../UI/Common/Mypage_Edit_Btn";
import A_TextHighlight from "../../atoms/Common/A_TextHighlight";
import Age from "./Age";

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
      {/* <div>닉네임</div> */}
      <div className={style.btnContainer}>
        <div className={style.nickname}>
          <A_TextHighlight color="red">{nickname}</A_TextHighlight>
        </div>
        <div className={style.editBtn}>
          <Mypage_Edit_Btn imgClick={modifyNickName} />
        </div>
      </div>
    </div>
  );
};

export default NickName;
