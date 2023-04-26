import React from "react";
import style from "./TeamBuildingRoom.module.scss";
import BlueHeartLine from "../UI/Common/BlueHeartLine";

const TeamBuildingRoom = () => {
  return (
    <div className={style.container}>
      <div className={style.teamcode}>
        <BlueHeartLine />
        <span>TEAM CODE</span>
        <BlueHeartLine />
      </div>
    </div>
  );
};

export default TeamBuildingRoom;
