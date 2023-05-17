import style from "./styles/A_MyTeamListItem.module.scss";
import { member } from "../../../types/member";

type PropsType = {
  member: member;
};

const A_MyTeamListItem: React.FC<PropsType> = ({ member }) => {
  console.log(member);
  return (
    <li className={style.item}>
      <img className={style.profileImage} src={member.profileImage} />
      {member.teamLeader && (
        <img
          className={style.leaderBadge}
          src={`${process.env.REACT_APP_ASSETS_DIR}/star_badge.png`}
        />
      )}
    </li>
  );
};

export default A_MyTeamListItem;
