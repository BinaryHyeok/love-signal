import React from "react";
import style from "./TeamBuildingMenu.module.scss";
import BlueHeartLine from "../UI/Common/BlueHeartLine";
import TeamBuildingMenuList from "./TeamBuildingMenuList";

const TeamBuildingMenu = () => {
  return (
    <div className={style.menuBox}>
      <BlueHeartLine />
      <TeamBuildingMenuList />
      <BlueHeartLine />
    </div>
  );
};

export default TeamBuildingMenu;
