import { useEffect } from "react";
import style from "./styles/Chat.module.scss";
import T_Chat from "../templates/T_Chat";
import { useRecoilState } from "recoil";
import { roomId } from "../../atom/chatRoom";
import T_ChatRoom from "../templates/T_ChatRoom";
import { footerIsOn } from "../../atom/footer";
import { footerIdx } from "../../atom/footer";

const Chat = () => {
  const [idx, setIdx] = useRecoilState<number>(footerIdx);
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomId);
  const [_, setFooterIsOn] = useRecoilState(footerIsOn);
  const TEMP_ROOM_MAN_COUNT = "3";

  useEffect(() => {
    setIdx(2);
    return () => {
      setSelectedRoom("");
      setFooterIsOn(true);
    };
  }, []);

  const roomExitHandler = () => {
    setSelectedRoom("");
    setFooterIsOn(true);
  };

  return (
    <div className={style.container}>
      {/* 채팅방 타입은 TEAM, ALL, NOTICE, ANONYMOUS로 나뉘어져 있음 */}
      <T_ChatRoom
        className={`${selectedRoom ? "slide-in-enter" : ""} common-bg`}
        roomId={selectedRoom}
        count={TEMP_ROOM_MAN_COUNT}
        roomExitHandler={roomExitHandler}
        roomType={"ANONYMOUS"}
      />
      <T_Chat />
    </div>
  );
};

export default Chat;
