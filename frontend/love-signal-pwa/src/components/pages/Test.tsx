import React from "react";
import cookie from "react-cookies";

const Test = () => {
  const setCookie = () => {
    const expires = new Date(); //현재 시간 받아오고.
    expires.setSeconds(expires.getSeconds() + 60); //현재 시간에 만료시간의 초 + 만료기간 더해주기
    cookie.save("rtk", "adasdasda", {
      path: "/", //일단 모든 경로에서 전부 쿠키 쓸수있게 해놓기.
      expires, //만료기간 설정
      secure: true, //보안 설정
      // httpOnly: true, //보안 설정
    });
  };

  const getCookie = () => {
    console.log(cookie.load("rtk"));
  };

  return (
    <>
      <button onClick={setCookie}>쿠키 저장하기~</button>
      <button onClick={getCookie}>쿠키 가져오기~</button>
    </>
  );
};

export default Test;
