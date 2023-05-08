import React, { useState, useEffect } from "react";
import style from "./styles/T_Chat.module.scss";
import M_Notice_Type_A from "../../molecules/Chat/M_ChatTopNotice";
import O_ChatList from "../../organisms/Chat/O_ChatList";
import axios from "axios";
import { room } from "../../../types/room";
import { getChatRoomList } from "../../../api/room";

const DUMMY_ROOM_LIST: room[] = [
  {
    UUID: "1",
    roomName: "남자방",
    memberCount: "3",
    lastMsgTime: "2023-05-01 11:39:27",
    type: "TEAM",
    members: [
      {
        nickname: "Tom",
        age: 22,
        description: "반가워요",
        profileImage:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Jimmy",
        age: 26,
        description: "Hellooooo",
        profileImage:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Mike",
        age: 31,
        description: "WeoWeoWeo",
        profileImage:
          "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    UUID: "2",
    roomName: "러브하우스",
    memberCount: "6",
    lastMsgTime: "2023-05-02 00:03:12",
    type: "GROUP",
    members: [
      {
        nickname: "Tom",
        age: 22,
        description: "반가워요",
        profileImage:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Jimmy",
        age: 26,
        description: "Hellooooo",
        profileImage:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Mike",
        age: 31,
        description: "WeoWeoWeo",
        profileImage:
          "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Tom",
        age: 22,
        description: "반가워요",
        profileImage:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Jimmy",
        age: 26,
        description: "Hellooooo",
        profileImage:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        nickname: "Mike",
        age: 31,
        description: "WeoWeoWeo",
        profileImage:
          "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    UUID: "3",
    roomName: "러브시그널",
    memberCount: "",
    lastMsgTime: "2023-05-01 23:59:59",
    type: "SYSTEM",
  },
  {
    UUID: "4",
    roomName: "익명",
    memberCount: "2",
    lastMsgTime: "2023-05-01 12:03:12",
    type: "SECRET",
  },
];

const T_Chat = () => {
  const [roomList, setRoomList] = useState<room[]>([]);

  // test용 state
  const [userUUID, setUserUUID] = useState<string>(
    "882a9377-c1a6-4802-a0d8-2f310c004fed"
  );

  useEffect(() => {
    // 더미 코드
    // setRoomList(() => [...DUMMY_ROOM_LIST]);
    // 테스트를 위해 임시 주석처리
    getChatRoomList(userUUID).then((res) => {
      const data: room[] = res.data;
      console.log(res.data);
      setRoomList(() => [...data]);
    });
  }, []);

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
