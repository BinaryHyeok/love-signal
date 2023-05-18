import React, { useEffect, useState } from "react";
import style from "./styles/A_ChatItemInfo.module.scss";

type PropsType = {
  uuid?: string;
  roomName?: string;
  memberCount?: string;
  lastMsgTime?: string;
  showTimer: boolean;
  updatedDate?: string;
};

let timer: NodeJS.Timer;
const A_ChatItemInfo: React.FC<PropsType> = ({
  roomName,
  memberCount,
  lastMsgTime,
  showTimer,
  updatedDate,
}) => {
  const [resTime, setResTime] = useState<string>("00:00");

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

    if (timeoutTime.getTime() <= today.getTime()) {
      clearInterval(timer);
      return;
    }

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

    setResTime(`${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`);
  };

  const timeForMatter = (str: string) => {
    if (!str || str.length === 0) return null;
    const [s_date, s_time] = str.split("T");
    const [year, month, date] = s_date.split("-");
    const [hour, min, sec] = s_time.split(".")[0].split(":");

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
