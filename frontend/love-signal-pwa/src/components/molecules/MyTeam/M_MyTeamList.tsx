import React from "react";
import style from "./styles/M_MyTeamList.module.scss";
import ListBoxWithImgTitle from "../../UI/Common/ListBoxWithImgTitle";
import { member } from "../../../types/member";
import A_MyTeamListItem from "../../atoms/MyTeam/A_MyTeamListItem";
import A_Heartline from "../../atoms/Common/A_Heartline";

type PropsType = {
  memberList: member[];
};

const M_MyTeamList: React.FC<PropsType> = ({ memberList }) => {
  return (
    <ListBoxWithImgTitle
      title={
        <>
          <A_Heartline type="blue" count="3" />
          <span>나의 팀</span>
          <A_Heartline type="blue" count="3" />
        </>
      }
      type="blue"
    >
      <ul className={style.teamList}>
        {memberList.map((item, idx) => (
          <A_MyTeamListItem key={idx} member={item} />
        ))}
      </ul>
    </ListBoxWithImgTitle>
  );
};

export default M_MyTeamList;
