import React from "react";
import style from "./styles/M_ChatItemContent.module.scss";
import A_ChatItemInfo from "../atoms/A_ChatItemInfo";
import A_ChatItemPreview from "../atoms/A_ChatItemPreview";

const M_ChatItemContent = () => {
  return (
    <div className={style.contentBox}>
      <A_ChatItemInfo />
      <A_ChatItemPreview />
    </div>
  );
};

export default M_ChatItemContent;
