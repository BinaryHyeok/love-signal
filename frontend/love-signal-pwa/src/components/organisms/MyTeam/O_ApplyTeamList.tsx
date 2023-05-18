import React, { useState, Dispatch, SetStateAction } from "react";
import style from "./styles/O_ApplyTeamList.module.scss";
import { applyTeam } from "../../../types/member";
import M_ApplyTeamListItem from "../../molecules/MyTeam/M_ApplyTeamListItem";

type PropsType = {
  animation: boolean;
  setAnimation: Dispatch<SetStateAction<boolean>>;
  timeout: any;
  applyTeamList: applyTeam[];
  haveOppositeTeam: boolean;
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
  clickBtn: boolean;
  setClickBtn: Dispatch<SetStateAction<boolean>>;
};

const O_ApplyTeamList: React.FC<PropsType> = ({
  animation,
  setAnimation,
  timeout,
  applyTeamList,
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
          animation={animation}
          setAnimation={setAnimation}
          timeout={timeout}
          key={idx}
          team={team}
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
