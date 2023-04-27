import React from "react";
import style from "./TeamBuildingRoom.module.scss";
import BlueHeartLine from "../UI/Common/BlueHeartLine";
import RoomUserList from "./RoomUserList";
import Button_Type_A from "../UI/Common/Button_Type_A";

const TeamBuildingRoom = () => {
  const DUMMY_DISABLED = false;

  return (
    <div className={style.container}>
      <div className={style.teamcode}>
        <BlueHeartLine />
        <span className={style.code}>TEAM CODE</span>
        <BlueHeartLine />
      </div>
      <RoomUserList />
      <Button_Type_A
        width="212px"
        height="52px"
        background={DUMMY_DISABLED ? "#d9d9d9" : "#cad9ff"}
        // disabled={DUMMY_DISABLED}
      >
        팀 생성하기
      </Button_Type_A>
    </div>
  );
};

export default TeamBuildingRoom;
