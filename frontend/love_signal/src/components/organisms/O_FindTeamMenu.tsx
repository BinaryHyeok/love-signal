import style from "./styles/O_FindTeamMenu.module.scss";
import A_Heartline from "../atoms/Common/A_Heartline";
import M_FindTeamMenuList from "../molecules/FindTeam/M_FindTeamMenuList";

const O_FindTeamMenu = () => {
  return (
    <div className={style.menuBox}>
      <A_Heartline type="blue" count="3" />
      <M_FindTeamMenuList />
      <A_Heartline type="blue" count="3" />
    </div>
  );
};

export default O_FindTeamMenu;
