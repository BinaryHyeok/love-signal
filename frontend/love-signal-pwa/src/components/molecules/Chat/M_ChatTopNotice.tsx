import React, { useState, useEffect } from "react";
import style from "./styles/M_ChatTopNotice.module.scss";
import A_TopNoticeText from "../../atoms/Chat/A_TopNoticeText";

type PropsType = {
  className?: string;
  icon: string;
  text: string;
  width?: string;
  height?: string;
  background?: string;
  doTimeCount?: boolean;
  color?: string;
  onRoomExit?: (type: number) => void;
  updatedDate?: string;
};

let timer: NodeJS.Timer;
const M_ChatTopNotice: React.FC<PropsType> = ({
  className,
  icon,
  text,
  width,
  height,
  background,
  doTimeCount,
  color,
  onRoomExit,
  updatedDate,
}) => {
  const [resTime, setResTime] = useState<string>("00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      getResTime();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getResTime = () => {
    if (!updatedDate) return;

    const today = new Date();
    const start = new Date(updatedDate);
    const timeoutTime = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      start.getHours(),
      start.getMinutes(),
      start.getSeconds() + 60
    );

    let sec = timeoutTime.getSeconds() - today.getSeconds();
    let min = timeoutTime.getMinutes() - today.getMinutes();
    let hr = timeoutTime.getHours() - today.getHours();

    if (sec < 0 && min > 0) {
      sec += 60;
      min--;
    }
    if (min < 0 && hr > 0) {
      min += 60;
      hr--;
    }

    if (timeoutTime.getTime() < today.getTime()) {
      if (hr === 0 && min === 0 && sec === 0) {
        if (onRoomExit) {
          onRoomExit(-1);
        }
      }
      clearInterval(timer);
      return;
    }

    setResTime(`${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`);
  };

  return (
    <div
      className={`${style.noticeBox} ${className}`}
      style={{
        width,
        height,
        background,
        color,
      }}
    >
      {!doTimeCount ? (
        <A_TopNoticeText icon={icon} text={text} />
      ) : (
        <A_TopNoticeText
          icon={icon}
          text={"채팅방 닫히기까지"}
          resTime={resTime}
        />
      )}
    </div>
  );
};

export default M_ChatTopNotice;
