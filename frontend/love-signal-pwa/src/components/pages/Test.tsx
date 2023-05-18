import React, { useState } from "react";
import style from "./Test.module.scss"; // 스타일 파일을 import합니다.

const Test = () => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };
  return (
    <>
      <div
        style={{
          backgroundColor: isOn ? "green" : "gray",
          width: "50px",
          height: "30px",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: isOn ? "flex-end" : "flex-start",
          padding: "5px",
          boxSizing: "border-box",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handleClick}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            transition: "all 0.3s ease",
          }}
        />
      </div>
    </>
  );
};

export default Test;
