import { useEffect } from "react";
import { team } from "../../../types/member";
import A_GenderImg from "../../atoms/OtherGender/A_GenderImg";
import style from "./styles/M_OtherTeamPicture.module.scss";

type propsType = {
  viewDetail: (idx: number) => void;
  idx: number;
  team: team;
};

const PictureBox: React.FC<propsType> = ({ viewDetail, idx, team }) => {
  return (
    <>
      <div
        className={style.otherPicture}
        onClick={() => viewDetail(idx)}
        key={team.teamUUID}
      >
        {team.members.map((_, index) => (
          <>
            <A_GenderImg member={team.members[index]} key={index} />
          </>
        ))}
      </div>
    </>
  );
};

export default PictureBox;
