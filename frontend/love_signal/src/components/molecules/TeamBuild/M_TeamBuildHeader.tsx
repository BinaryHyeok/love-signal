import A_Heartline from "../../atoms/Common/A_Heartline";
import style from "./styles/M_TeamBuildHeader.module.scss";

type PropsType = {
  teamCode: string;
};

const M_TeamBuildHeader: React.FC<PropsType> = ({ teamCode }) => {
  return (
    <div className={style.teamcode}>
      <A_Heartline type="blue" count="3" />
      <span className={style.code}>{teamCode}</span>
      <A_Heartline type="blue" count="3" />
    </div>
  );
};

export default M_TeamBuildHeader;
