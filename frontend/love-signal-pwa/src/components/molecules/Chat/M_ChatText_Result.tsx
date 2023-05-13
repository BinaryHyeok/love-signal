import React from "react";
import styles from "./styles/M_ChatText_Result.module.scss";
import A_ChatText_TypeB from "../../atoms/Chat/A_ChatText_TypeB";
import { selectOrShareInfo } from "../../../types/chat";

type PropsType = {
  systemName: string;
  selectInfo: selectOrShareInfo;
};

const M_ChatText_Result: React.FC<PropsType> = ({ systemName, selectInfo }) => {
  let content = (
    <div className={""}>
      <div className={"imgBox"}>
        <img src={selectInfo.profileUrls ? selectInfo.profileUrls[0] : ""} />
      </div>
      <div className={"imgBox"}>
        <img src={""} />
      </div>
      <div className={"imgBox"}>
        <img src={selectInfo.profileUrls ? selectInfo.profileUrls[1] : ""} />
      </div>
    </div>
  );
  return (
    <A_ChatText_TypeB
      nickname={systemName}
      content={content}
      background="#fff"
      isNotice={true}
    />
  );
};

export default M_ChatText_Result;
