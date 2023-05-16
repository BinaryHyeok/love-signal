import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/O_ChatTextList.module.scss";
import M_ChatTextItem from "../../molecules/Chat/M_ChatTextItem";
import { chat, roomChatList } from "../../../types/chat";
import { useRecoilState } from "recoil";
import { nickname } from "../../../atom/member";
import { member } from "../../../types/member";

type PropsType = {
  ulRef: React.RefObject<HTMLUListElement>;
  roomType?: string;
  chatList: chat[];
  setChatList: React.Dispatch<React.SetStateAction<roomChatList>>;
  members: member[] | null;
  setOppositeTeamMember: Dispatch<SetStateAction<member[]>>;
  // setOppositeTeamUUID: Dispatch<SetStateAction<string>>;
  viewDetail: () => void;
};

const O_ChatTextList: React.FC<PropsType> = ({
  ulRef,
  roomType,
  chatList,
  setChatList,
  members,
  setOppositeTeamMember,
  // setOppositeTeamUUID,
  viewDetail,
}) => {
  console.log(roomType);
  const [me, _] = useRecoilState<string>(nickname);
  console.log("부모에서 가져온 채팅 목록 : ", chatList);
  console.log("부모에서 가져온 룸 멤버 정보 : ", members);
  return (
    <ul className={style.textList} ref={ulRef}>
      {chatList.map((item, idx) => (
        <M_ChatTextItem
          key={idx}
          roomType={roomType}
          chatType={item.type}
          isMe={item.nickname === me}
          profileImage={
            members &&
            members.filter((m) => m.nickname === item.nickname)[0]?.profileImage
          }
          chat={item}
          setChatList={setChatList}
          setOppositeTeamMember={setOppositeTeamMember}
          // setOppositeTeamUUID={setOppositeTeamUUID}
          viewDetail={viewDetail}
        />
      ))}
    </ul>
  );
};

export default O_ChatTextList;
