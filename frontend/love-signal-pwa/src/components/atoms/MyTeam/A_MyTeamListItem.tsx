import style from "./styles/A_MyTeamListItem.module.scss";
import { member } from "../../../types/member";

type PropsType = {
  member: member;
};

const A_MyTeamListItem: React.FC<PropsType> = ({ member }) => {
  return (
    <li className={style.item}>
      <img src="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI" />
    </li>
  );
};

export default A_MyTeamListItem;
