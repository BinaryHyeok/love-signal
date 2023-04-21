import React, { useRef } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button>메시지 전송</button>
    </div>
  );
};

export default Chat;
