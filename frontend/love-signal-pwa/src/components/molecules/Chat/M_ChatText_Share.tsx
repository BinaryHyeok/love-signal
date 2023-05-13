import React from "react";
import style from "./styles/M_ChatText_Share.module.scss";
import A_ChatText_TypeB from "../../atoms/Chat/A_ChatText_TypeB";
import { selectOrShareInfo } from "../../../types/chat";
import M_ChatSelectBox from "./M_ChatSelectBox";

type PropsType = {
  sender: string;
  selectInfo: selectOrShareInfo;
};
const M_ChatText_Share: React.FC<PropsType> = ({ sender, selectInfo }) => {
  const openTeamDetail = () => {
    alert("팀 정보 보여주는 모달을 띄워요~");
  };

  let content = (
    <>
      <ul className={style.shareList}>
        {selectInfo.nicknames?.map((item, idx) => (
          <M_ChatSelectBox
            key={idx}
            nickname={item}
            profile={selectInfo.profileUrls ? selectInfo.profileUrls[idx] : ""}
          />
        ))}
      </ul>
      <button className={style.showDetail} onClick={openTeamDetail}>
        상세보기
      </button>
    </>
  );

  return (
    <A_ChatText_TypeB
      nickname={sender}
      content={content}
      background="#fff"
      isNotice={true}
    />
  );
};

export default M_ChatText_Share;
