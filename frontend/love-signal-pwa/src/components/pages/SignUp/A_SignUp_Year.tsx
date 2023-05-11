import React from "react";

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
    <>
      <label htmlFor="year"></label>
      <select id="year" name="year" onChange={handleYearChange} value={myYear}>
        <option value="">--</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      년
    </>
  );
};

export default A_SignUp_Year;
