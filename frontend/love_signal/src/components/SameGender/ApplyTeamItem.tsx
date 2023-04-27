import React from "react";
import style from "./ApplyTeamItem.module.scss";
import Button_Type_A from "../UI/Common/Button_Type_A";

const ApplyTeamItem = (props: any) => {
  return (
    <li className={style.applyTeamBox}>
      <ul className={style.team}>
        {props.team.map((member: any) => (
          <div className={style.teamMember}></div>
        ))}
      </ul>
      <ul className={style.acceptBtnList}>
        <Button_Type_A width="56px" height="32px" background="#cad9ff">
          <img src="/assets/btn_check.png" />
        </Button_Type_A>
        <Button_Type_A width="56px" height="32px" background="#ffadb6">
          <img src="/assets/btn_reject.png" />
        </Button_Type_A>
      </ul>
    </li>
  );
};

export default ApplyTeamItem;
