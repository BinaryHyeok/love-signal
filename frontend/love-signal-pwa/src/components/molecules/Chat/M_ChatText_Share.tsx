import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/M_ChatText_Share.module.scss";
import A_ChatText_TypeB from "../../atoms/Chat/A_ChatText_TypeB";
import { chat, selectOrShareInfo } from "../../../types/chat";
import M_ChatSelectBox from "./M_ChatSelectBox";
import A_ChatText_TypeA from "../../atoms/Chat/A_ChatText_TypeA";
import { member } from "../../../types/member";

type PropsType = {
  sender: string;
  selectInfo: selectOrShareInfo;
  isMe: boolean;
  setOppositeTeamMember: Dispatch<SetStateAction<member[]>>;
  chat: chat;
  viewDetail: () => void;
};
const M_ChatText_Share: React.FC<PropsType> = ({
  sender,
  selectInfo,
  isMe,
  setOppositeTeamMember,
  chat,
  viewDetail,
}) => {
  const openTeamDetail = () => {
    if (chat.selectOrShareInfo?.memberList) {
      setOppositeTeamMember(chat.selectOrShareInfo.memberList);
    }
    viewDetail();
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

  return isMe ? (
    <A_ChatText_TypeA background="#fff" content={content} />
  ) : (
    <A_ChatText_TypeB
      nickname={sender}
      content={content}
      background="#fff"
      isNotice={true}
    />
  );
};

export default M_ChatText_Share;
