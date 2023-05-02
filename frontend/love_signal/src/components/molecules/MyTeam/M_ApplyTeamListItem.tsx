import style from "./styles/M_ApplyTeamListItem.module.scss";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import { member } from "../../../types/member";

type PropsType = {
  team: member[];
};

const M_ApplyTeamListItem: React.FC<PropsType> = ({ team }) => {
  return (
    <li className={style.applyTeamBox}>
      <ul className={style.team}>
        {team.map((member, idx) => (
          <div className={style.teamMember} key={idx}></div>
        ))}
      </ul>
      <ul className={style.acceptBtnList}>
        <Button_Type_A width="56px" height="32px" background="#cad9ff">
          <img src="/assets/btn_check.png" />
        </Button_Type_A>
        <Button_Type_A width="56px" height="32px" background="#ffadb6">
          <img src="/assets/btn_reject.png" />
        </Button_Type_A>
      </ul>
    </li>
  );
};

export default M_ApplyTeamListItem;
