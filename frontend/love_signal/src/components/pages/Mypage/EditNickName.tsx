import React, { Dispatch, SetStateAction } from "react";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import style from "./styles/NickName.module.scss";

type propsType = {
  changeName: Dispatch<SetStateAction<boolean>>;
};

const EditNickName: React.FC<propsType> = ({ changeName }) => {
  const ApplyNickName = () => {
    changeName(true);
  };
  return (
    <div className={style.containerEdit}>
      <div>닉네임</div>
      <div>
        <Input_Type_A
          type="text"
          id="닉네임변경해."
          className="writeNickName"
        />
      </div>
      <div>
        <Button_Type_A
          width="72px"
          height="32px"
          background="#FBCED3"
          onClick={ApplyNickName}
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

export default EditNickName;
