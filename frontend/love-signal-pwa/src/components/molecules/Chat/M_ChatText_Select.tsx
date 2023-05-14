import React from "react";
import style from "./styles/M_ChatText_Select.module.scss";
import A_ChatText_TypeB from "../../atoms/Chat/A_ChatText_TypeB";
import { chat, selectOrShareInfo } from "../../../types/chat";
import M_ChatSelectBox from "./M_ChatSelectBox";
import { createOneToOneRoom, selectOneMember } from "../../../api/chat";
import { useRecoilState } from "recoil";
import { myMemberUUID } from "../../../atom/member";

type PropsType = {
  systemName: string;
  selectInfo: selectOrShareInfo;
  chat: chat;
};
const M_ChatText_Select: React.FC<PropsType> = ({
  systemName,
  selectInfo,
  chat,
}) => {
  const [memberUUID, _] = useRecoilState<string>(myMemberUUID);
  const selectOneHandler = (nickname: string) => {
    selectOneMember(chat.roomUUID || "", chat.uuid || "", memberUUID, nickname);
    createOneToOneRoom(memberUUID, nickname);
  };

  let content = (
    <ul className={style.selectList}>
      {selectInfo.nicknames?.map((item, idx) => (
        <M_ChatSelectBox
          key={idx}
          nickname={item}
          profile={selectInfo.profileUrls ? selectInfo.profileUrls[idx] : ""}
          selectHandler={selectOneHandler}
          isSelected={selectInfo.isSelected === "T"}
          isSelect={true}
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
