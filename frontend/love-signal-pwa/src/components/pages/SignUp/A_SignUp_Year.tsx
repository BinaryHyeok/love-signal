import React from "react";
import style from "./styles/SignUp.module.scss";

type propsType = {
  handleYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  myYear: string;
};

const A_SignUp_Year: React.FC<propsType> = ({ handleYearChange, myYear }) => {
  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - 30 + i
  );
  return (
    <span className={style.yearTag}>
      <label htmlFor="year"></label>
      <select
        className={style.selectBox}
        id="year"
        name="year"
        onChange={handleYearChange}
        value={myYear}
      >
        <option value="">--</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      년
    </span>
  );
};

export default A_SignUp_Year;
