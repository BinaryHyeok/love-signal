import React from "react";
import style from "./styles/Chat.module.scss";
import T_Chat from "../templates/T_Chat";
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
    return () => {
      setSelectedRoom("");
      setFooterIsOn(true);
    };
  }, []);

  const roomExitHandler = () => {
    setSelectedRoom("");
    setFooterIsOn(true);
  };

>>>>>>> Stashed changes
  return (
    <div className={style.container}>
      <T_Chat />
    </div>
  );
};

export default Chat;
