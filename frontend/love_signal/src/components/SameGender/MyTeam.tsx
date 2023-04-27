import Header from "../UI/Header/Header";
import style from "./MyTeam.module.scss";
import MyTeamDesc from "./MyTeamDesc";
import MyTeamList from "./MyTeamList";

const MyTeam = () => {
  return (
    <div className={style.container}>
      <Header />
      <MyTeamDesc />
      <MyTeamList />
    </div>
  );
};

export default MyTeam;
