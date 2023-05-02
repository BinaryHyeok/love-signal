import React from "react";
import Image from "./A_Image";
import Profile from "./M_Profile";

type propsType = {
  imgurl: string;
  nickname: string;
  age: number;
  description: string;
};

const O_UserInfo: React.FC<propsType> = ({
  imgurl,
  nickname,
  age,
  description,
}) => {
  return (
    <>
      <Image imgurl={imgurl} />
      <Profile nickname={nickname} age={age} description={description} />
    </>
  );
};

export default O_UserInfo;
