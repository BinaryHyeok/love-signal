import style from "./styles/M_TeamBuildHeader.module.scss";
import HeartLine from "../../UI/Common/HeartLine";

type PropsType = {
  teamCode: string;
};

const M_TeamBuildHeader: React.FC<PropsType> = ({ teamCode }) => {
  return (
    <div className={style.teamcode}>
      <HeartLine type="blue" count="3" />
      <span className={style.code}>{teamCode}</span>
      <HeartLine type="blue" count="3" />
    </div>
  );
};

export default M_TeamBuildHeader;
