import React from "react";
import style from "./styles/M_TeamMemberItem.module.scss";
import { member } from "../../../types/member";
import A_TeamMemberImage from "../../atoms/TeamBuild/A_TeamMemberImage";
import M_TeamMemberProfile from "./M_TeamMemberProfile";

type PropsType = {
  member: member;
};

const M_TeamMemberItem: React.FC<PropsType> = ({ member }) => {
  return (
    <li className={style.listItem}>
      <A_TeamMemberImage />
      <M_TeamMemberProfile member={member} />
    </li>
  );
};

export default M_TeamMemberItem;
