import React, { useState, useEffect } from "react";
import style from "./styles/T_Chat.module.scss";
import M_Notice_Type_A from "../../molecules/Chat/M_ChatTopNotice";
import O_ChatList from "../../organisms/Chat/O_ChatList";
import axios from "axios";
import { room } from "../../../types/room";

const T_Chat = () => {
  const [roomList, setRoomList] = useState<room[]>([]);
  const uuid = "cc1e6e93-bfdf-4869-9595-140e4f2acbf4";
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
