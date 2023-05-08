import React, { useEffect, useState } from "react";
import style from "./styles/A_ChatItemInfo.module.scss";

type PropsType = {
  uuid?: string;
  roomName?: string;
  memberCount?: string;
  lastMsgTime?: string;
  showTimer: boolean;
};

let timer: NodeJS.Timer;
const A_ChatItemInfo: React.FC<PropsType> = ({
  roomName,
  memberCount,
  lastMsgTime,
  showTimer,
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
    const today = new Date();
    const timeoutTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      30
    );

    if (timeoutTime.getTime() <= today.getTime()) {
      clearInterval(timer);
      setResTime("00:00:00");
      return;
    }

    let sec = timeoutTime.getSeconds() - today.getSeconds();
    let min = timeoutTime.getMinutes() - today.getMinutes();
    let hr = timeoutTime.getHours() - today.getHours();

    if (sec < 0) {
      sec += 60;
      min--;
    }
    if (min < 0) {
      min += 60;
      hr--;
    }

    setResTime(
      `${hr < 10 ? "0" + hr : hr}:${min < 10 ? "0" + min : min}:${
        sec < 10 ? "0" + sec : sec
      }`
    );
  };

  const timeForMatter = (str: string) => {
    if (!str || str.length === 0) return null;
    const [s_date, s_time] = str.split(" ");
    const [year, month, date] = s_date.split("-");
    const [hour, min, sec] = s_time.split(":");

    return {
      year,
      month,
      date,
      hour,
      min,
      sec,
    };
  };

  const timeView = (sendTime: string) => {
    const date = timeForMatter(sendTime);
    if (!date) return "";
    const APM = +date.hour < 12 ? "오전" : "오후";

    return `${APM} ${date.hour}:${date.min}`;
  };

  return (
    <div className={style.infoBox}>
      <div className={style.titleBox}>
        <span className={style.title}>{roomName}</span>
        {showTimer ? (
          <span className={style.timer}>{resTime}</span>
        ) : (
          <span className={style.count}>{memberCount}</span>
        )}
      </div>
      <div className={style.time}>
        {lastMsgTime ? timeView(lastMsgTime) : ""}
      </div>
    </div>
  );
};

export default A_ChatItemInfo;
