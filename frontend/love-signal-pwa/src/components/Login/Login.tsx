import style from "./Login.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [myId, setMyId] = useState<string>("");
  const [myPw, setMyPw] = useState<string>("");
  const navigate = useNavigate();

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
      .post(`${process.env.REACT_APP_API_AUTH}/member/auth/sign-in`, {
        loginId: myId,
        password: myPw,
      })
      .then((response) => {
        console.log(response);
        navigate("/OtherGender");
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
        <div>
          새롭게 코드가 추가되고 푸시되면 자동배포가 되는지 cicd 테스트용임ㅋ
        </div>
        <input
          type="password"
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
