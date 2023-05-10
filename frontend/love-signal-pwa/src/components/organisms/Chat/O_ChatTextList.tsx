import React from "react";
import style from "./styles/O_ChatTextList.module.scss";
import M_ChatTextItem from "../../molecules/Chat/M_ChatTextItem";
import { chat } from "../../../types/chat";
import { useRecoilState } from "recoil";
import { nickname } from "../../../atom/member";
import { member } from "../../../types/member";

type PropsType = {
  ulRef: React.RefObject<HTMLUListElement>;
  roomType?: string;
  chatList: chat[];
  members: member[];
};

const O_ChatTextList: React.FC<PropsType> = ({
  ulRef,
  roomType,
  chatList,
  members,
}) => {
  const [me, _] = useRecoilState<string>(nickname);
  console.log("부모에서 가져온 채팅 목록 : ", chatList);
  console.log("부모에서 가져온 룸 멤버 정보 : ", members);
  return (
    <ul className={style.textList} ref={ulRef}>
      {chatList.map((item, idx) => (
        <M_ChatTextItem
          key={idx}
          roomType={roomType}
          isMe={item.nickname === me}
          nickname={item.nickname}
          content={item.content}
          createdDate={item.createdDate}
          type={item.type}
          profileImage={
            members.filter((m) => m.nickname === item.nickname)[0].profileImage
          }
        />
      ))}
    </ul>
  );
};

export default O_ChatTextList;
