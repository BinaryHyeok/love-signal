import React from "react";
import style from "./TeamBuildingRoom.module.scss";
import BlueHeartLine from "../UI/Common/BlueHeartLine";
import RoomUserList from "./RoomUserList";

const TeamBuildingRoom = () => {
  return (
    <div className={style.container}>
      <div className={style.teamcode}>
        <BlueHeartLine />
        <span className={style.code}>TEAM CODE</span>
        <BlueHeartLine />
      </div>
      <RoomUserList />
    </div>
  );
};

export default TeamBuildingRoom;
