import { useEffect } from "react";
import style from "./styles/Chat.module.scss";
import T_Chat from "../templates/T_Chat";
<<<<<<< HEAD
<<<<<<< Updated upstream

const Chat = () => {
=======
import { useRecoilState } from "recoil";
import { roomId } from "../../atom/chatRoom";
import T_ChatRoom from "../templates/T_ChatRoom";
import { footerIsOn } from "../../atom/footer";
import { footerIdx } from "../../atom/footer";

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomId);
  const [_, setFooterIsOn] = useRecoilState(footerIsOn);
  const [idx, setIdx] = useRecoilState<number>(footerIdx);
  const TEMP_ROOM_MAN_COUNT = "3";

  useEffect(() => {
    setIdx(2);
=======
import { useRecoilState } from "recoil";
import { roomId } from "../../atom/chatRoom";
import T_ChatRoom from "../templates/T_ChatRoom";
import { footerIsOn } from "../../atom/footer";

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomId);
  const [_, setFooterIsOn] = useRecoilState(footerIsOn);
  const TEMP_ROOM_MAN_COUNT = "3";

  useEffect(() => {
>>>>>>> 0dfb00ea06811e55ea5e8a29dc6e73dc8c05908b
    return () => {
      setSelectedRoom("");
      setFooterIsOn(true);
    };
  }, []);

  const roomExitHandler = () => {
    setSelectedRoom("");
    setFooterIsOn(true);
  };

<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> 0dfb00ea06811e55ea5e8a29dc6e73dc8c05908b
  return (
    <div className={style.container}>
      {/* {selectedRoom ? (
        <T_ChatRoom className="common-bg" roomId={selectedRoom} />
      ) : (
        <T_Chat />
      )} */}
      <T_ChatRoom
        className={`${selectedRoom ? "slide-in-enter" : ""} common-bg`}
        roomId={selectedRoom}
        count={TEMP_ROOM_MAN_COUNT}
        roomExitHandler={roomExitHandler}
      />
      <T_Chat />
    </div>
  );
};

export default Chat;
