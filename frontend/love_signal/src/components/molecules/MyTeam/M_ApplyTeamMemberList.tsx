import React from "react";
import style from "./styles/M_ApplyTeamMember.module.scss";
import { member } from "../../../types/member";
import A_ApplyTeamMember from "../../atoms/MyTeam/A_ApplyTeamMember";

type PropsType = {
  team: member[];
};

const M_ApplyTeamMemberList: React.FC<PropsType> = ({ team }) => {
  return (
    <ul className={style.team}>
      {team.map((member, idx) => (
        <A_ApplyTeamMember key={idx} />
      ))}
    </ul>
  );
};

export default M_ApplyTeamMemberList;
