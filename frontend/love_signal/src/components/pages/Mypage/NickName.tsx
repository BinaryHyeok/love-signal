import React, { Dispatch, SetStateAction } from "react";
// import style from "./styles/NickName.module.scss";

type propsType = {
  changeName: Dispatch<SetStateAction<boolean>>;
};

const NickName: React.FC<propsType> = ({ changeName }) => {
  const modifyNickName = () => {
    changeName(false);
  };
  return (
    <>
      <div>닉네임</div>
      <button onClick={modifyNickName}>수정하기</button>
    </>
  );
};

export default NickName;
