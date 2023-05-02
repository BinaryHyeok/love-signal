import style from "./styles/MyTeam.module.scss";
import MyTeamList from "./MyTeamList";
import T_MyTeam from "../../templates/MyTeam/T_MyTeam";
import M_MyTeamDesc from "../../molecules/MyTeam/M_MyTeamDesc";
import O_MyTeamBox from "../../organisms/MyTeam/O_MyTeamBox";

const MyTeam = () => {
  return (
    <div className={style.container}>
      <T_MyTeam>
        <M_MyTeamDesc />
        <O_MyTeamBox />
      </T_MyTeam>
    </div>
  );
};

export default MyTeam;
