import React from "react";
import style from "./M_Profile.module.scss";
import Nickname from "./A_Nickname";
import Age from "./A_Age";
import Description from "./A_Description";

type propsType = {
  nickname: string;
  age: number;
  description: string;
};

const M_profile: React.FC<propsType> = ({ nickname, age, description }) => {
  return (
    <div className={style.profileBlack}>
      <div className={style.profileText}>
        <div>
          <Nickname nickname={nickname} />
          <Age age={age} />
        </div>
        <Description description={description} />
      </div>
    </div>
  );
};

export default M_profile;
