import React from "react";
import style from "./styles/A_ChatSendTime.module.scss";

type PropsType = {
  sendTime: string;
};

const A_ChatSendTime: React.FC<PropsType> = ({ sendTime }) => {
  const timeForMatter = (str: string) => {
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
    const APM = +date.hour < 12 ? "오전" : "오후";

    return `${APM} ${date.hour}:${date.min}`;
  };
  return <span className={style.timeView}>{timeView(sendTime)}</span>;
};

export default A_ChatSendTime;
