import React from "react";
import style from "./styles/A_ChatItemInfo.module.scss";

type PropsType = {
  id: string;
  title: string;
  memberCount: string;
  lastMsgTime?: string;
};

const A_ChatItemInfo: React.FC<PropsType> = ({
  id,
  title,
  memberCount,
  lastMsgTime,
}) => {
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

  return (
    <div className={style.infoBox}>
      <div className={style.titleBox}>
        <span className={style.title}>{title}</span>
        <span className={style.count}>{memberCount}</span>
      </div>
      <div className={style.time}>
        {lastMsgTime ? timeView(lastMsgTime) : ""}
      </div>
    </div>
  );
};

export default A_ChatItemInfo;
