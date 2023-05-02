import React from "react";
import style from "./styles/M_TeamMemberProfile.module.scss";
import { member } from "../../../types/member";

type PropsType = {
  member: member;
};

const M_TeamMemberProfile: React.FC<PropsType> = ({ member }) => {
  return (
    <div className={style.profileBox}>
      <div className={style.profile}>
        {member.nickname}
        {member.age < 1 ? "" : `, ${member.age}`}
      </div>
      <div className={style.introduce}>{member.description}</div>
    </div>
  );
};

export default M_TeamMemberProfile;
