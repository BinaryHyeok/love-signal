import React, { Dispatch, SetStateAction } from "react";
import Input_Type_A from "../../UI/Common/Input_Type_A";

type propsType = {
  changeIntroduce: Dispatch<SetStateAction<boolean>>;
};

const EditIntroduce: React.FC<propsType> = ({ changeIntroduce }) => {
  const ApplyIntroduce = () => {
    changeIntroduce(true);
  };
  return (
    <div>
      <Input_Type_A type="text" id="자기소개" />
      <button onClick={ApplyIntroduce}>적용하기</button>
    </div>
  );
};

export default EditIntroduce;
