import React from "react";
import style from "./styles/Introduce.module.scss";
import Mypage_Edit_Btn from "../../UI/Common/Mypage_Edit_Btn";
import MyIntroduce from "./MyIntroduce";

type propsType = {
  myIntroduce: string;
  toggleMode: () => void;
};

const Introduce: React.FC<propsType> = ({ myIntroduce, toggleMode }) => {
  return (
    <div className={style.container}>
      {/* <div>자기소개</div> */}
      <MyIntroduce myIntroduce={myIntroduce} />
      <div className={style.btn}>
        <Mypage_Edit_Btn imgClick={toggleMode} />
      </div>
    </div>
  );
};

export default Introduce;
