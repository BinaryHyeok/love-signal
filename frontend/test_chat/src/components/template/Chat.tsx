import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [msg, setMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on("res_msg", (msg: string) => {
      chatListUpdateHandler(msg);
    });
  }, []);

  const chatListUpdateHandler = (msg: string) => {
    console.log(msg);
  };

  const chatSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myMsg = inputRef.current != null ? inputRef.current.value : "";
    socket.emit("req_msg", myMsg);
  };

  const chatInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  return (
    <form onSubmit={chatSubmitHandler}>
      <input
        type="text"
        ref={inputRef}
        onChange={chatInputChangeHandler}
        value={msg}
      />
      <button>메시지 전송</button>
    </form>
  );
};

export default Chat;
