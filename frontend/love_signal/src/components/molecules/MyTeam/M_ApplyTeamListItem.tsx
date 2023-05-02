import style from "./styles/M_ApplyTeamListItem.module.scss";
import { member } from "../../../types/member";
import M_ApplyTeamMemberList from "./M_ApplyTeamMemberList";
import M_ApplyAcceptButtonList from "../FindTeam/M_ApplyAcceptButtonList";

type PropsType = {
  team: member[];
};

const M_ApplyTeamListItem: React.FC<PropsType> = ({ team }) => {
  return (
    <li className={style.applyTeamBox}>
      <M_ApplyTeamMemberList team={team} />
      <M_ApplyAcceptButtonList />
    </li>
  );
};

export default M_ApplyTeamListItem;
