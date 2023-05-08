import React, { useState, useEffect } from "react";
import style from "./styles/T_Chat.module.scss";
import M_Notice_Type_A from "../../molecules/Chat/M_ChatTopNotice";
import O_ChatList from "../../organisms/Chat/O_ChatList";
import { room } from "../../../types/room";
import { getChatRoomList } from "../../../api/room";
import { inquireMember } from "../../../api/auth";
import { useRecoilState } from "recoil";
import { nickname } from "../../../atom/member";

const T_Chat = () => {
  const [roomList, setRoomList] = useState<room[]>([]);

  // test용 state
  const [userUUID, setUserUUID] = useState<string>(
    "882a9377-c1a6-4802-a0d8-2f310c004fed"
  );
  const [_, setMe] = useRecoilState<string>(nickname);

  useEffect(() => {
    // 더미 코드
    inquireMember(userUUID).then((res) => {
      setMe(res.data.body.nickname);
    });

    getChatRoomList(userUUID).then((res) => {
      const data: room[] = res.data;
      console.log(res.data);
      setRoomList(() => [...data]);
    });
  }, [userUUID]);

  return (
    <div className={`${style.template_chat}`}>
      <input
        type="text"
        value={userUUID}
        onChange={(e) => {
          setUserUUID(e.target.value);
        }}
      />
      <M_Notice_Type_A
        icon="/assets/notice_A.png"
        text="매일 저녁 10시에는 선택의 시간이 진행됩니다."
        width="90%"
      />
      <O_ChatList roomList={roomList} />
    </div>
  );
};

export default T_Chat;
