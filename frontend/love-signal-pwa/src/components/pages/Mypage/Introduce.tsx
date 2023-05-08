import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/Introduce.module.scss";
import Mypage_Edit_Btn from "../../UI/Common/Mypage_Edit_Btn";
import MyIntroduce from "./MyIntroduce";

type propsType = {
  myIntroduce: string;
  changeIntroduce: Dispatch<SetStateAction<boolean>>;
};

const Introduce: React.FC<propsType> = ({ myIntroduce, changeIntroduce }) => {
  const modifyIntroduce = () => {
    changeIntroduce(false);
  };
  return (
    <div className={style.container}>
      {/* <div>자기소개</div> */}
      <MyIntroduce myIntroduce={myIntroduce} />
      <div className={style.btn}>
        <Mypage_Edit_Btn imgClick={modifyIntroduce} />
      </div>
    </div>
  );
};

export default Introduce;
