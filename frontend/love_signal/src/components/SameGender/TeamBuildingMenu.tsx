import React from "react";
import style from "./TeamBuildingMenu.module.scss";
import HeartLine from "../UI/Common/HeartLine";
import TeamBuildingMenuList from "./TeamBuildingMenuList";

const TeamBuildingMenu = () => {
  return (
    <div className={style.menuBox}>
      <HeartLine type="blue" count="3" />
      <TeamBuildingMenuList />
      <HeartLine type="blue" count="3" />
    </div>
  );
};

export default TeamBuildingMenu;
