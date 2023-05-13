import React from "react";
import style from "./styles/Introduce.module.scss";
import Mypage_Edit_Btn from "../../atoms/Mypage/Mypage_Edit_Btn";
import MyIntroduce from "../../atoms/Mypage/MyIntroduce";

type propsType = {
  description: string;
  toggleMode: () => void;
};

const Introduce: React.FC<propsType> = ({ description, toggleMode }) => {
  return (
    <div className={style.container}>
      {/* <div>자기소개</div> */}
      <MyIntroduce description={description} />
      <div className={style.btn}>
        <Mypage_Edit_Btn imgClick={toggleMode} />
      </div>
    </div>
  );
};

export default Introduce;
