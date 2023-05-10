import React, { useState } from "react";

interface Birthday {
  year: number | null;
  month: number | null;
  day: number | null;
}

const years = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i
);

const months = Array.from({ length: 12 }, (_, i) => i + 1);

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const Test = () => {
  const [birthday, setBirthday] = useState<Birthday>({
    year: null,
    month: null,
    day: null,
  });

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setBirthday((prev) => ({ ...prev, year }));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value);
    setBirthday((prev) => ({ ...prev, month }));
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const day = parseInt(event.target.value);
    setBirthday((prev) => ({ ...prev, day }));
  };

  return (
    <div>
      <label htmlFor="year">생년</label>
      <select
        id="year"
        name="year"
        onChange={handleYearChange}
        value={birthday.year ?? ""}
      >
        <option value="">--</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label htmlFor="month">월</label>
      <select
        id="month"
        name="month"
        onChange={handleMonthChange}
        value={birthday.month ?? ""}
      >
        <option value="">--</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <label htmlFor="day">일</label>
      <select
        id="day"
        name="day"
        onChange={handleDayChange}
        value={birthday.day ?? ""}
      >
        <option value="">--</option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Test;
