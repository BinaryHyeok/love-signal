import React from "react";

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
    <>
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
    </>
  );
};

export default A_SignUp_Month;
