import React, { useState, useEffect } from "react";

const Test = () => {
  const getDaysInMonth = (month: number, year: number) => {
    // 윤년 체크
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    switch (month) {
      case 2:
        return isLeapYear ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  };

  const [myYear, setMyYear] = useState<string>("");
  const [myMonth, setMyMonth] = useState<string>("");
  const [realMonth, setRealMonth] = useState<string>("");
  const [realDay, setRealDay] = useState<string>("");
  const [myDay, setMyDay] = useState<string>("");
  const [myBirth, setMyBirth] = useState<string>("");

  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - 30 + i
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    setMyBirth(myYear + myMonth + myDay);
  }, [myYear, myMonth, myDay]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setMyYear(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value);
    setRealMonth(event.target.value);
    if (parseInt(event.target.value) < 10) {
      setMyMonth("0" + event.target.value);
    } else {
      setMyMonth(event.target.value);
    }
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const day = parseInt(event.target.value);
    setRealDay(event.target.value);
    if (parseInt(event.target.value) < 10) {
      setMyDay("0" + event.target.value);
    } else {
      setMyDay(event.target.value);
    }
  };

  const combineBirth = () => {
    if (myYear !== "" && myMonth !== "" && myDay !== "") {
      //셋다 입력했을때.
      console.log(myBirth);
    } else {
      alert("다 찍어라.");
    }
  };

  const days: number[][] = months.map((month) => {
    return Array.from(
      { length: getDaysInMonth(month, parseInt(myYear)) },
      (_, i) => i + 1
    );
  });

  return (
    <div>
      <label htmlFor="year">생년</label>
      <select id="year" name="year" onChange={handleYearChange} value={myYear}>
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

      <label htmlFor="day">일</label>
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
      <button onClick={combineBirth}>생년월일합치기</button>
    </div>
  );
};

export default Test;
