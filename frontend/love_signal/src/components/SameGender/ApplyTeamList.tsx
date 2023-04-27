import React from "react";
import ApplyTeamItem from "./ApplyTeamItem";
import style from "./ApplyTeamList.module.scss";

const ApplyTeamList = (props: any) => {
  return (
    <ul className={style.applyTeamList}>
      {props.applyList.map((team: any) => (
        <ApplyTeamItem team={team} />
      ))}
    </ul>
  );
};

export default ApplyTeamList;
