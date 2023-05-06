import React, { useState, useEffect } from "react";
import style from "./styles/T_Chat.module.scss";
import M_Notice_Type_A from "../../molecules/Chat/M_ChatTopNotice";
import O_ChatList from "../../organisms/Chat/O_ChatList";
import axios from "axios";
import { room } from "../../../types/room";

const T_Chat = () => {
  const [roomList, setRoomList] = useState<room[]>([]);
  // test용 state
  const [userUUID, setUserUUID] = useState<string>(
    "882a9377-c1a6-4802-a0d8-2f310c004fed"
  );
  const uuid = "882a9377-c1a6-4802-a0d8-2f310c004fed";
  useEffect(() => {
    axios.get("http://localhost:8080/chatRoom/" + uuid).then((res) => {
      const result = res.data;
      console.log(result);
      console.log(JSON.parse(result));
      const json: room[] = JSON.parse(result);
      setRoomList(() => [...json]);
      // [
      //   {
      //     UUID: "",
      //     type: "",
      //     roomName: "",
      //     lastChat: "",
      //     notReadChat: "",
      //     createdDate: "",
      //     updatedDate: "",
      //     expired: "",
      //   },
      // ];
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
