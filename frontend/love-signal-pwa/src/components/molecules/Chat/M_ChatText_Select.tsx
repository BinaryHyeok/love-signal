import React from "react";
import style from "./styles/M_ChatText_Select.module.scss";
import A_ChatText_TypeB from "../../atoms/Chat/A_ChatText_TypeB";
import { selectOrShareInfo } from "../../../types/chat";
import M_ChatSelectBox from "./M_ChatSelectBox";

type PropsType = {
  systemName: string;
  selectInfo: selectOrShareInfo;
};
const M_ChatText_Select: React.FC<PropsType> = ({ systemName, selectInfo }) => {
  const selectOneHandler = (nickname: string) => {
    console.log(`select : ${nickname}`);
  };

  let content = (
    <ul className={style.selectList}>
      {selectInfo.nicknames?.map((item, idx) => (
        <M_ChatSelectBox
          key={idx}
          nickname={item}
          profile={selectInfo.profiles ? selectInfo.profiles[idx] : ""}
          selectHandler={selectOneHandler}
        />
      ))}
    </ul>
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

export default M_ChatText_Select;
