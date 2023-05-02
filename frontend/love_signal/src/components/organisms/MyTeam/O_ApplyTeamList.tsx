import React from "react";
import style from "./styles/O_ApplyTeamList.module.scss";
import { member } from "../../../types/member";
import M_ApplyTeamListItem from "../../molecules/MyTeam/M_ApplyTeamListItem";
import ApplyTeamItem from "../../SameGender/ApplyTeamItem";

type PropsType = {
  applyTeamList: member[][];
};

const O_ApplyTeamList: React.FC<PropsType> = ({ applyTeamList }) => {
  return (
    <ul className={style.applyTeamList}>
      {applyTeamList.map((team, idx) => (
        <M_ApplyTeamListItem key={idx} team={team} />
        // <ApplyTeamItem key={idx} team={team} />
      ))}
    </ul>
  );
};

export default O_ApplyTeamList;
