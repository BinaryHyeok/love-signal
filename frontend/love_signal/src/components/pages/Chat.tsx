import { useEffect } from "react";
import style from "./styles/Chat.module.scss";
import T_Chat from "../templates/T_Chat";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../atom/chatRoom";
import T_ChatRoom from "../templates/T_ChatRoom";
import { footerIsOn } from "../../atom/footer";

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomInfo);
  const [_, setFooterIsOn] = useRecoilState(footerIsOn);

  useEffect(() => {
    return () => {
      setSelectedRoom({});
      setFooterIsOn(true);
    };
  }, []);

  const roomExitHandler = () => {
    setSelectedRoom({});
    setFooterIsOn(true);
  };

  return (
    <div className={style.container}>
      {/* 채팅방 타입은 TEAM, ALL, NOTICE, ANONYMOUS로 나뉘어져 있음 */}
      <T_ChatRoom
        className={`${selectedRoom.id ? "slide-in-enter" : ""} common-bg`}
        roomId={selectedRoom.id}
        title={selectedRoom.title}
        count={selectedRoom.memberCount}
        roomExitHandler={roomExitHandler}
        roomType={selectedRoom.type}
      />
      <T_Chat />
    </div>
  );
};

export default Chat;
