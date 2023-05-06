import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/O_ApplyTeamList.module.scss";
import { member } from "../../../types/member";
import M_ApplyTeamListItem from "../../molecules/MyTeam/M_ApplyTeamListItem";

type PropsType = {
  applyTeamList: member[][];
  isLeader: boolean;
  haveOppositeTeam: boolean;
  oppoVisible: boolean;
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
};

const O_ApplyTeamList: React.FC<PropsType> = ({
  applyTeamList,
  isLeader,
  haveOppositeTeam,
  oppoVisible,
  setOppoVisible,
  setOppoTeamIdx,
}) => {
  const openModal = () => {
    setOppoVisible(!oppoVisible);
  };
  return (
    <ul className={style.applyTeamList} onClick={openModal}>
      {applyTeamList.map((team, idx) => (
        <M_ApplyTeamListItem
          key={idx}
          team={team}
          isLeader={isLeader}
          haveOppositeTeam={haveOppositeTeam}
          idx={idx}
          setOppoTeamIdx={setOppoTeamIdx}
        />
      ))}
    </ul>
  );
};

export default O_ApplyTeamList;
