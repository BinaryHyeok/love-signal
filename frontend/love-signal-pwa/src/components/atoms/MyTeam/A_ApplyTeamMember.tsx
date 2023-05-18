import { member } from "../../../types/member";
import style from "./styles/A_ApplyTeamMember.module.scss";

type propsType = {
  member: member;
};

const A_ApplyTeamMember: React.FC<propsType> = ({ member }) => {
  return (
    <div className={style.teamMember}>
      <img src={member.profileImage} />
    </div>
  );
};

export default A_ApplyTeamMember;
