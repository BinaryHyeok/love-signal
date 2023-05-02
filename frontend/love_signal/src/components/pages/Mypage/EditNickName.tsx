import React, { Dispatch, SetStateAction } from "react";
import Input_Type_A from "../../UI/Common/Input_Type_A";

type propsType = {
  changeName: Dispatch<SetStateAction<boolean>>;
};

const EditNickName: React.FC<propsType> = ({ changeName }) => {
  const ApplyNickName = () => {
    changeName(true);
  };
  return (
    <>
      <Input_Type_A type="text" id="닉네임변경해." />
      <button onClick={ApplyNickName}>적용하기</button>
    </>
  );
};

export default EditNickName;
