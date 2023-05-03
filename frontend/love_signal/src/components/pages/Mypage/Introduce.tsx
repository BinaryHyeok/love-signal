import React, { Dispatch, SetStateAction } from "react";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import style from "./styles/Introduce.module.scss";

type propsType = {
  changeIntroduce: Dispatch<SetStateAction<boolean>>;
};

const Introduce: React.FC<propsType> = ({ changeIntroduce }) => {
  const modifyIntroduce = () => {
    changeIntroduce(false);
  };
  return (
    <div>
      <div>자기소개</div>
      <div className={style.introduceText}></div>
      <div>
        <Button_Type_A
          onClick={modifyIntroduce}
          width="72px"
          height="32px"
          background=""
        >
          <img src="/assets/EditBtn.png" alt="" className={style.img} />
        </Button_Type_A>
      </div>
    </div>
  );
};

export default Introduce;
