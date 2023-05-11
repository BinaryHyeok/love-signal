import React from "react";
import style from "./styles/M_TeamMemberProfile.module.scss";
import { member } from "../../../types/member";
import A_MemberLoadingText from "../../atoms/TeamBuild/A_MemberLoadingText";

type PropsType = {
  member: member;
};

const M_TeamMemberProfile: React.FC<PropsType> = ({ member }) => {
  return (
    <div className={style.profileBox}>
      <div className={style.profile}>
        <span className={style.nickname}>{member.nickname}</span>
        <span className={style.age}>
          {member.age < 1 ? "" : `${" "}(${member.age})`}
        </span>
      </div>
      {member.nickname !== "LOADING" ? (
        <div className={style.introduce}>{member.description}</div>
      ) : (
        <A_MemberLoadingText text={"팀원을 기다리는 중"} />
      )}
    </div>
  );
};

export default M_TeamMemberProfile;
