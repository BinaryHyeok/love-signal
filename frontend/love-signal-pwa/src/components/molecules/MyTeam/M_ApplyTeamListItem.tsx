import style from "./styles/M_ApplyTeamListItem.module.scss";
import { member } from "../../../types/member";
import M_ApplyTeamMemberList from "./M_ApplyTeamMemberList";
import M_ApplyAcceptButtonList from "../FindTeam/M_ApplyAcceptButtonList";

type PropsType = {
  team: member[];
  isLeader: boolean;
  haveOppositeTeam: boolean;
};

const M_ApplyTeamListItem: React.FC<PropsType> = ({
  team,
  isLeader,
  haveOppositeTeam,
}) => {
  //실제론 team안에있는 상대팀의 teamUUID를 넣어야합니다.
  const oppsiteTeamCode: string = "B309";
  return (
    <li className={style.applyTeamBox}>
      <M_ApplyTeamMemberList team={team} />
      <M_ApplyAcceptButtonList
        isLeader={isLeader}
        haveOppositeTeam={haveOppositeTeam}
        oppsiteTeamUUID={oppsiteTeamCode}
      />
    </li>
  );
};

export default M_ApplyTeamListItem;
