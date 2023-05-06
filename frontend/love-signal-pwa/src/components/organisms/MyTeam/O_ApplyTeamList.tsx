import React from "react";
import style from "./styles/O_ApplyTeamList.module.scss";
import { member } from "../../../types/member";
import M_ApplyTeamListItem from "../../molecules/MyTeam/M_ApplyTeamListItem";

type PropsType = {
  applyTeamList: member[][];
  isLeader: boolean;
  haveOppositeTeam: boolean;
};

const O_ApplyTeamList: React.FC<PropsType> = ({
  applyTeamList,
  isLeader,
  haveOppositeTeam,
}) => {
  return (
    <ul className={style.applyTeamList}>
      {applyTeamList.map((team, idx) => (
        <M_ApplyTeamListItem
          key={idx}
          team={team}
          isLeader={isLeader}
          haveOppositeTeam={haveOppositeTeam}
        />
      ))}
    </ul>
  );
};

export default O_ApplyTeamList;
