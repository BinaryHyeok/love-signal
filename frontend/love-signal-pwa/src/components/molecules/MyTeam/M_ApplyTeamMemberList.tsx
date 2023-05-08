import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/M_ApplyTeamMember.module.scss";
import { member } from "../../../types/member";
import A_ApplyTeamMember from "../../atoms/MyTeam/A_ApplyTeamMember";

type PropsType = {
  team: member[];
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
  idx: number;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
};

const M_ApplyTeamMemberList: React.FC<PropsType> = ({
  team,
  setOppoVisible,
  idx,
  setOppoTeamIdx,
}) => {
  const openModal = () => {
    setOppoTeamIdx(idx);
    setOppoVisible(true);
  };
  return (
    <ul className={style.team} onClick={openModal}>
      {team.map((member, idx) => (
        <A_ApplyTeamMember member={member} key={idx} />
      ))}
    </ul>
  );
};

export default M_ApplyTeamMemberList;
