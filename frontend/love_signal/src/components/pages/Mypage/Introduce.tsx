import React, { Dispatch, SetStateAction } from "react";

type propsType = {
  changeIntroduce: Dispatch<SetStateAction<boolean>>;
};

const Introduce: React.FC<propsType> = ({ changeIntroduce }) => {
  const modifyIntroduce = () => {
    changeIntroduce(false);
  };
  return (
    <>
      <div>자기소개</div>
      <button onClick={modifyIntroduce}>수정하기</button>
    </>
  );
};

export default Introduce;
