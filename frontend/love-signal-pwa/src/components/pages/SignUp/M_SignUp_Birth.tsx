import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import style from "./styles/SignUp.module.scss";
import A_SignUp_Desc3 from "./A_SignUp_Desc3";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import A_SignUp_Year from "./A_SignUp_Year";
import A_SignUp_Month from "./A_SignUp_Month";
import A_SignUp_Day from "./A_SignUp_Day";

type PropsType = {
  onClick: () => void;
  setBirth: Dispatch<SetStateAction<string>>;
};

const M_SignUp_Birth: React.FC<PropsType> = ({ onClick, setBirth }) => {
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

  useEffect(() => {
    setBirth(myYear + myMonth + myDay);
  }, [myYear, myMonth, myDay]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMyYear(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRealMonth(e.target.value);
    if (parseInt(e.target.value) < 10) {
      setMyMonth("0" + e.target.value);
    } else {
      setMyMonth(e.target.value);
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRealDay(e.target.value);
    if (parseInt(e.target.value) < 10) {
      setMyDay("0" + e.target.value);
    } else {
      setMyDay(e.target.value);
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days: number[][] = months.map((month) => {
    return Array.from(
      { length: getDaysInMonth(month, parseInt(myYear)) },
      (_, i) => i + 1
    );
  });
  return (
    <div className={style.userInfo}>
      <A_SignUp_Desc3 />
      <div>
        <A_SignUp_Year handleYearChange={handleYearChange} myYear={myYear} />
        <A_SignUp_Month
          handleMonthChange={handleMonthChange}
          realMonth={realMonth}
          myYear={myYear}
          months={months}
        />
        <A_SignUp_Day
          handleDayChange={handleDayChange}
          realDay={realDay}
          myYear={myYear}
          myMonth={myMonth}
          days={days}
        />
      </div>
      <div className={style.checkBtn}>
        <Button_Type_A
          className="dupleCheck"
          width="236px"
          height="32px"
          background="#FBCED3"
          onClick={onClick}
        >
          확인
        </Button_Type_A>
      </div>
    </div>
  );
};

export default M_SignUp_Birth;
