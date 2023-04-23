import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

type MsgData = {
  user: string;
  msg: string;
};

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [nick, setNick] = useState("username" + Math.ceil(Math.random() * 10));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on("res_msg", (data: MsgData) => {
      msgNotificationHandler(data);
      chatListUpdateHandler(data);
    });
  }, []);

  const notiPermissionHandler = () => {
    Notification.requestPermission().then((result) => {
      console.log(result);
      if (result === "granted") {
        // randomNotification();
      }
    });
  };

  const msgNotificationHandler = (data: MsgData) => {
    var notifTitle = "Title";
    var notifBody = "Created by " + data.user + ".";
    // var notifImg = "data/img/" + games[randomItem].slug + ".jpg";
    var options = {
      body: notifBody,
      // icon: notifImg,
    };
    const nofi = new Notification(notifTitle, options);
    console.log(nofi);
    // registration.showNotification();
    setTimeout(() => {
      msgNotificationHandler(data);
    }, 3000);
  };

  const chatListUpdateHandler = (data: MsgData) => {
    console.log(`${data.user}: ${data.msg}`);
  };

  const chatSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myMsg = inputRef.current != null ? inputRef.current.value : "";
    const msgData: MsgData = {
      user: nick,
      msg: myMsg,
    };
    socket.emit("req_msg", msgData);
  };

  const chatInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  return (
    <>
      <button onClick={notiPermissionHandler}>알림허용</button>
      <form onSubmit={chatSubmitHandler}>
        <input
          type="text"
          ref={inputRef}
          onChange={chatInputChangeHandler}
          value={msg}
        />
        <button>메시지 전송</button>
      </form>
    </>
  );
};

export default Chat;
