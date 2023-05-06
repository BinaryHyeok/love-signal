import React from "react";
import Image from "./A_Image";
import Profile from "./M_Profile";

type propsType = {
  profileImage: string;
  nickname: string;
  age: number;
  description: string;
};

const O_UserInfo: React.FC<propsType> = ({
  profileImage,
  nickname,
  age,
  description,
}) => {
  return (
    <>
      <Image profileImage={profileImage} />
      <Profile nickname={nickname} age={age} description={description} />
    </>
  );
};

export default O_UserInfo;
