import React from "react";
import style from "./styles/SignUp.module.scss";

type propsType = {
  handleMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  realMonth: string;
  myYear: string;
  months: number[];
};

const A_SignUp_Month: React.FC<propsType> = ({
  handleMonthChange,
  realMonth,
  myYear,
  months,
}) => {
  return (
    <span className={style.monthTag}>
      <label htmlFor="month"></label>
      <select
        id="month"
        name="month"
        onChange={handleMonthChange}
        value={realMonth}
        disabled={myYear === ""}
      >
        <option value="">--</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      월
    </span>
  );
};

export default A_SignUp_Month;
