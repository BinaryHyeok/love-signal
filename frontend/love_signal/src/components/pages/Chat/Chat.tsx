import { useEffect } from "react";
import style from "./styles/Chat.module.scss";
import T_Chat from "../../templates/Chat/T_Chat";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../../atom/chatRoom";
import T_ChatRoom from "../../templates/Chat/T_ChatRoom";
import { footerIsOn } from "../../../atom/footer";
import { footerIdx } from "../../../atom/footer";

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomInfo);
  const [idx, setIdx] = useRecoilState<number>(footerIdx);
  const [_, setFooterIsOn] = useRecoilState(footerIsOn);

  useEffect(() => {
    setIdx(2);
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
    <div className={`${style.container}`}>
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
