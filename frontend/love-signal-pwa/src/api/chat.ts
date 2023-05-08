import axios from "axios";
import { chat } from "../types/chat";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

//채팅 목록 불러오기
export const getChatList = async (uuid: string) => {
  return await axios({
    method: "get",
    url: `http://localhost:8080/chat/messages/${uuid}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

/* 소켓 통신 */
const socket = new SockJS("http://localhost:8080/ws-stomp");
const ws = Stomp.over(socket);

export const connectChatServer = async (roomUUID: string) => {
  const header = {};
  ws.connect(header, (frame: any) => {
    console.log("방 입장 : " + roomUUID);
    ws.subscribe("/sub/chat/room/" + roomUUID, (res: any) => {
      const messages = JSON.parse(res.body);
      console.log(messages);
    });

    publishChatMsg({
      type: "TEXT",
      roomUUID: roomUUID,
      nickname: "임시 닉네임",
      content: "",
    });
  });
};

export const publishChatMsg = (newChat: chat) => {
  const header = {};
  ws.send("/pub/chat/message", header, JSON.stringify(newChat));
};
