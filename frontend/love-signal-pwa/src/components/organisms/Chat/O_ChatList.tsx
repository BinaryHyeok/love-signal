import React, { useRef, useEffect } from "react";
import style from "./styles/O_ChatList.module.scss";
import M_ChatItem from "../../molecules/Chat/M_ChatItem";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { chatList } from "../../../atom/chat";
import { room } from "../../../types/room";
import { getChatList } from "../../../api/chat";

import { Stomp, Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let socket: any;
let stompClient: any;

type PropsType = {
  roomList: room[];
};

const O_ChatList: React.FC<PropsType> = ({ roomList }) => {
  const [selectedRoom, setSelectedRoom] = useRecoilState<room>(roomInfo);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);
  const [___, setChatList] = useRecoilState(chatList);

  useEffect(() => {
    socket = new SockJS("http://localhost/ws-stomp");
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame: any) => {
        console.log("연결시도");
        stompClient.subscribe(`/sub/chat/${selectedRoom.uuid}`, (res: any) => {
          console.log(res.body);
          console.log(JSON.parse(res.body));
        });
      },
      (err: any) => {
        console.error("~~~~~~~~~~~~~~");
        console.error(err);
      }
    );
  }, []);

  // const socket = new SockJS("/ws-stomp");
  // const ws = Stomp.over(socket);

  // const wsClient = new Client({
  //   brokerURL: "/ws-stomp",
  //   connectHeaders: {},
  //   debug: (str) => {
  //     console.log(str);
  //   },
  // });

  // wsClient.onConnect = (frame) => {
  //   console.log("연결 되었다~~~");
  //   wsClient.subscribe("/sub/chat", (frame: any) => {});
  // };

  // wsClient.onStompError = (frame) => {
  //   console.log("Broker reported Error", frame.headers["message"]);
  //   console.log("Additional details: ", frame.body);
  // };

  // wsClient.activate();

  // const connect = () => {
  //   console.log("선택된 방 : ", selectedRoom);
  //   ws.connect({}, (frame: any) => {
  //     ws.subscribe("/sub/chat/room" + selectedRoom.uuid, (res) => {
  //       const messages = JSON.parse(res.body);
  //       console.log(messages);
  //     });
  // ws.send(
  //   "/pub/chat/message",
  //   {},
  //   JSON.stringify({
  //     type: "ENTER",
  //     roomId: selectedRoom.uuid,
  //     // nickname: NickName,
  //   })
  // );
  //   });
  // };
  // connect();

  const selectRoomHandler = (e: React.MouseEvent<HTMLElement>): void => {
    console.log("selected Room uuid : " + e.currentTarget.id);
    roomList.forEach((room) => {
      if (room.uuid === e.currentTarget.id) {
        setSelectedRoom(JSON.parse(JSON.stringify(room)));
        getChatList(room.uuid).then((res) => {
          console.log(res.data);
          setChatList([...res.data]);
        });
      }
    });
    setFooterIsOn(false);
  };

  return (
    <ul className={style.chatList}>
      {roomList.map((room) => (
        <M_ChatItem key={room.uuid} room={room} onClick={selectRoomHandler} />
      ))}
    </ul>
  );
};

export default O_ChatList;
