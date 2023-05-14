import React from "react";

type propsType = {
  nickname: string;
};

const A_Nickname: React.FC<propsType> = ({ nickname }) => {
  return (
    <>
      <b>{nickname}</b>
    </>
  );
};

export default A_Nickname;
