import React, { Dispatch, SetStateAction } from "react";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import style from "./styles/EditIntroduce.module.scss";

type propsType = {
  changeIntroduce: Dispatch<SetStateAction<boolean>>;
};

const EditIntroduce: React.FC<propsType> = ({ changeIntroduce }) => {
  const ApplyIntroduce = () => {
    changeIntroduce(true);
  };
  return (
    <div className="style.container">
      <div>자기소개</div>
      <div className={style.input}>
        <Input_Type_A type="text" id="자기소개" className="writeIntroduce" />
      </div>
      <div className={style.button}>
        <Button_Type_A
          width="72px"
          height="32px"
          background="#FBCED3"
          onClick={ApplyIntroduce}
        >
          <img
            src="/assets/btn_check_violet.png"
            alt=""
            className={style.img}
          />
        </Button_Type_A>
      </div>
    </div>
  );
};

export default EditIntroduce;
