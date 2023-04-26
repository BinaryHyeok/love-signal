import Header from "../UI/Header/Header";
import style from "./FindTeam.module.scss";
import TeamBuildingDesc from "./TeamBuildingDesc";
import TeamBuildingMenu from "./TeamBuildingMenu";

const FindTeam = () => {
  return (
    <div className={`${style.container} diagonal-gradient`}>
      <Header />
      동성 팀 찾는 페이지 입니다. (빠른 매칭, 방만들기, 방 번호입력이 있는
      페이지)
      <TeamBuildingDesc />
      <TeamBuildingMenu />
    </div>
  );
};

export default FindTeam;
