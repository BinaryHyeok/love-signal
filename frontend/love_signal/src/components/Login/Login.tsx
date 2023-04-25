import style from "./Login.module.scss";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [myId, setMyId] = useState<string>("");
  const [myPw, setMyPw] = useState<string>("");

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setMyId(target.value);
  };

  const handleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setMyPw(target.value);
  };

  const checkLogin = () => {
    //로그인 되는지 체크해주는 함수
    axios
      .post("/경로어디어디뭐시기/member/auth/sign-in", {
        id: myId,
        pw: myPw,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={style.loginTainer}>
        <input
          type="text"
          id="email"
          value={myId}
          name="email"
          onChange={handleChangeId}
          className={style.loginTextform}
          placeholder="test@test.com"
        />
        <input
          type="text"
          id="email"
          value={myPw}
          name="email"
          onChange={handleChangePw}
          className={style.loginTextform}
          placeholder="test@test.com"
        />
        <button onClick={checkLogin}>로그인</button>
      </div>
    </>
  );
};

export default Login;
