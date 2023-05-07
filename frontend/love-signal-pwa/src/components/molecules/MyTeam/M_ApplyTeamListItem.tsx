import style from "./styles/M_ApplyTeamListItem.module.scss";
import { member } from "../../../types/member";
import M_ApplyTeamMemberList from "./M_ApplyTeamMemberList";
import M_ApplyAcceptButtonList from "../FindTeam/M_ApplyAcceptButtonList";
import { Dispatch, SetStateAction } from "react";

type PropsType = {
  team: member[];
  isLeader: boolean;
  haveOppositeTeam: boolean;
  idx: number;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
};

const M_ApplyTeamListItem: React.FC<PropsType> = ({
  team,
  isLeader,
  haveOppositeTeam,
  idx,
  setOppoTeamIdx,
  setOppoVisible,
}) => {
  //실제론 team안에있는 상대팀의 teamUUID를 넣어야합니다.
  const oppsiteTeamCode: string = "B309";
  const setIdx = () => {
    console.log(idx);
    setOppoTeamIdx(idx);
  };
  return (
    <li className={style.applyTeamBox} onClick={setIdx}>
      <M_ApplyTeamMemberList team={team} setOppoVisible={setOppoVisible} />
      <M_ApplyAcceptButtonList
        isLeader={isLeader}
        haveOppositeTeam={haveOppositeTeam}
        oppsiteTeamUUID={oppsiteTeamCode}
      />
    </li>
  );
};

export default M_ApplyTeamListItem;
