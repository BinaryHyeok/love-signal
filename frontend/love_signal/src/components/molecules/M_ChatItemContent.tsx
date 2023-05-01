import React from "react";
import style from "./styles/M_ChatItemContent.module.scss";
import A_ChatItemInfo from "../atoms/Chat/A_ChatItemInfo";
import A_ChatItemPreview from "../atoms/Chat/A_ChatItemPreview";

type PropsType = {
  id: string;
  title: string;
  memberCount: string;
};

const M_ChatItemContent: React.FC<PropsType> = ({ id, title, memberCount }) => {
  return (
    <div className={style.contentBox}>
      <A_ChatItemInfo id={id} title={title} memberCount={memberCount} />
      <A_ChatItemPreview />
    </div>
  );
};

export default M_ChatItemContent;
