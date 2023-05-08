import React from "react";
import style from "./styles/A_ChatSendTime.module.scss";

type PropsType = {
  createdDate?: string;
};

const A_ChatSendTime: React.FC<PropsType> = ({ createdDate }) => {
  const timeForMatter = (str: string) => {
    if (!str) return null;
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

  const timeView = (createdDate: string | null | undefined) => {
    if (!createdDate) return "";
    const date = timeForMatter(createdDate);
    if (!date) return "";
    const APM = +date.hour < 12 ? "오전" : "오후";

    return `${APM} ${date.hour}:${date.min}`;
  };
  return <span className={style.timeView}>{timeView(createdDate)}</span>;
};

export default A_ChatSendTime;
