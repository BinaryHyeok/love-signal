import Header from "../UI/Header/Header";
import style from "./TeamBuilding.module.scss";
import TeamBuildingRoom from "./TeamBuildingRoom";

const TeamBuilding = () => {
  return (
    <div className={style.container}>
      <Header />
      <TeamBuildingRoom />
    </div>
  );
};

export default TeamBuilding;
