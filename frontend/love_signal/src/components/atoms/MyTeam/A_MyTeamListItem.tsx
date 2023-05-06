import style from "./styles/A_MyTeamListItem.module.scss";
import { member } from "../../../types/member";

type PropsType = {
  member: member;
};

const A_MyTeamListItem: React.FC<PropsType> = ({ member }) => {
  return (
    <li className={style.item}>
      <img src={member.profileImage} />
    </li>
  );
};

export default A_MyTeamListItem;
