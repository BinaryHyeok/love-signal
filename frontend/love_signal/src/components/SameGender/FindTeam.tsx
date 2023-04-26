import Header from "../UI/Header/Header";
import style from "./FindTeam.module.scss";
import TeamBuildingDesc from "./TeamBuildingDesc";
import TeamBuildingMenu from "./TeamBuildingMenu";

const FindTeam = () => {
  return (
    <div className={`${style.container}`}>
      <Header />
      <TeamBuildingDesc />
      <TeamBuildingMenu />
    </div>
  );
};

export default FindTeam;
