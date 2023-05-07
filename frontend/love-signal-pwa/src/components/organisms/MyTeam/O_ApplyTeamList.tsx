import React, { useState, Dispatch, SetStateAction } from "react";
import style from "./styles/O_ApplyTeamList.module.scss";
import { applyTeam } from "../../../types/member";
import M_ApplyTeamListItem from "../../molecules/MyTeam/M_ApplyTeamListItem";

type PropsType = {
  applyTeamList: applyTeam[];
  isLeader: boolean;
  haveOppositeTeam: boolean;
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
  clickBtn: boolean;
  setClickBtn: Dispatch<SetStateAction<boolean>>;
};

const O_ApplyTeamList: React.FC<PropsType> = ({
  applyTeamList,
  isLeader,
  haveOppositeTeam,
  setOppoVisible,
  setOppoTeamIdx,
  clickBtn,
  setClickBtn,
}) => {
  return (
    <ul className={style.applyTeamList}>
      {applyTeamList.map((team, idx) => (
        <M_ApplyTeamListItem
          key={idx}
          team={team}
          isLeader={isLeader}
          haveOppositeTeam={haveOppositeTeam}
          idx={idx}
          setOppoTeamIdx={setOppoTeamIdx}
          setOppoVisible={setOppoVisible}
          clickBtn={clickBtn}
          setClickBtn={setClickBtn}
        />
      ))}
    </ul>
  );
};

export default O_ApplyTeamList;
