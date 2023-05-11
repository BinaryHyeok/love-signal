import React from "react";

type propsType = {
  handleDayChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  realDay: string;
  myYear: string;
  myMonth: string;
  days: number[][];
};

const A_SignUp_Day: React.FC<propsType> = ({
  handleDayChange,
  realDay,
  myYear,
  myMonth,
  days,
}) => {
  return (
    <>
      <label htmlFor="day"></label>
      <select
        id="day"
        name="day"
        onChange={handleDayChange}
        value={realDay}
        disabled={myYear === "" || myMonth === ""}
      >
        <option value="">--</option>
        {days[parseInt(myMonth) - 1]?.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      일
    </>
  );
};

export default A_SignUp_Day;
