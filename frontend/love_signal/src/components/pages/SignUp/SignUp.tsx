import style from "./styles/SignUp.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import Introduce from "../Mypage/Introduce";

const SignUp = () => {
  const [email] = useState<string>("");
  const [password] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [checkNickname, setCheckNickname] = useState<boolean>(false);
  const [checkProfileOk, setCheckProfileOk] = useState<boolean>(false);
  const [checkNickOk, setCheckNickOk] = useState<boolean>(false);
  const [checkBirthOk, setCheckBirthOk] = useState<boolean>(false);

  const navigate = useNavigate();

  const birth: string = "1997";
  const description: string = "나는 손종효다";
  const gender: string = "M";
  const help: string = "T";

  // const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;
  //   setEmail(target.value);
  // };

  // const handleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;
  //   setPassword(target.value);
  // };

  const handleProfile = () => {
    setCheckProfileOk(!checkProfileOk);
  };

  const handleNickname = () => {
    setCheckNickOk(!checkNickOk);
  };

  const handleBirth = () => {
    setCheckBirthOk(!checkBirthOk);
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setNickname(target.value);
    setCheckNickname(false); //바뀌면 바로 false로 바꿔줘.
  };

  //중복확인 해주는 함수입니다.
  const duplecheck = () => {
    console.log("!");
    axios
      .get(`http://localhost:8888/member/auth/check/nickname/${nickname}`)
      .then((response) => {
        //여기로 와서 만약 response가 중복되지 않은것을 알려주었다면?

        if (response) {
          setCheckNickname(true); //중복확인 체크하기.
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);

        console.log(err); //에러발생!
      });
  };

  //회원가입 버튼 클릭했을때
  const signup = () => {
    if (checkNickname) {
      //중복 확인 했을때만 가능하다
      axios
        .post("http://localhost:8888/member/auth/sign-up", {
          birth: birth,
          description: description,
          gender: gender,
          help: help,
          loginId: email,
          nickname: nickname,
          password: password,
        })
        .then((response) => {
          console.log(response);
          navigate("/Manual");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //아니면 중복확인 눌러줘~
      alert("중복확인 체크는 하셨나요?");
    }
  };

  return (
    <div className={style.box}>
      <div className={`${style.Container} diagonal-gradient`}>
        <div className={style.center}>
          <div className={style.logo}>
            <img
              src="/assets/logo.png"
              height="100vh"
              alt="로고"
              className={style.img}
            />
          </div>
          {!checkProfileOk && !checkNickOk && !checkBirthOk && (
            <div>
              <div className={style.text}>
                여러분은 입주 전, 해야할 일이 있습니다.
                <br />
                <br />
                <span className={style.bold}>첫번째 시그널,</span>
                <br />
                <br />
                자신을 잘 드러낼 수 있는
                <br />
                <span className={style.bold}>프로필 사진</span>을
                등록해야합니다.
                <br />
              </div>
              <div>
                <M_Image_Type />
              </div>
              <div className={style.checkBtn}>
                <Button_Type_A
                  className="dupleCheck"
                  width="236px"
                  height="32px"
                  background="#FBCED3"
                  onClick={handleProfile}
                >
                  확인
                </Button_Type_A>
              </div>
            </div>
          )}
          {checkProfileOk && !checkNickOk && !checkBirthOk && (
            <div className={style.userInfo}>
              <div className={style.text}>
                <span className={style.bold}>두번째 시그널,</span>
                <br />
                <br />
                자신을 가장 잘 나타낼 수 있는
                <br />
                <span className={style.bold}>닉네임</span>을 설정해야합니다.
                <br />
              </div>
              <div className={style.nickName}>
                <div>
                  <Input_Type_A
                    className="writeNickName"
                    type="text"
                    id="nickName"
                    value={nickname}
                    onChange={handleChangeNickname}
                    placeholder="닉네임은여덟글자"
                  />
                </div>
                <div>
                  <Button_Type_A
                    className="dupleCheck"
                    width="80px"
                    height="32px"
                    background="#FBCED3"
                    onClick={duplecheck}
                    // disabled={true}
                  >
                    중복확인
                  </Button_Type_A>
                </div>
              </div>
              <div className={style.checkBtn}>
                <Button_Type_A
                  className="dupleCheck"
                  width="236px"
                  height="32px"
                  background="#FBCED3"
                  onClick={handleNickname}
                >
                  확인
                </Button_Type_A>
              </div>
            </div>
          )}
          {checkProfileOk && checkNickOk && !checkBirthOk && (
            <div className={style.userInfo}>
              <div className={style.text}>
                <span className={style.bold}>세번째 시그널,</span>
                <br />
                <br />
                자신이 <span className={style.bold}>태어난 년도</span>를
                입력해주세요
                <br />
              </div>
              <div className={style.nickName}>
                <div>
                  <Input_Type_A
                    className="writeBirth"
                    type="text"
                    id="birthYear"
                    value={birth}
                    onChange={handleChangeNickname}
                    placeholder="2023"
                  />
                </div>
              </div>
              <div className={style.checkBtn}>
                <Button_Type_A
                  className="dupleCheck"
                  width="236px"
                  height="32px"
                  background="#FBCED3"
                  onClick={handleBirth}
                >
                  확인
                </Button_Type_A>
              </div>
            </div>
          )}
          {checkProfileOk && checkNickOk && checkBirthOk && (
            <div className={style.userInfo}>
              <div className={style.text}>
                <span className={style.bold}>네번째 시그널,</span>
                <br />
                <br />
                <span className={style.bold}>자유롭게</span> 자신을{" "}
                <span className={style.bold}>표현</span>해보세요.
                <br />
              </div>
              <div className={style.nickName}>
                <div>
                  <Input_Type_A
                    className="writeIntroduce"
                    type="text"
                    id="description"
                    value={description}
                    onChange={handleChangeNickname}
                    placeholder={description}
                  />
                </div>
              </div>
              <div className={style.checkBtn}>
                <Button_Type_A
                  className="dupleCheck"
                  width="236px"
                  height="32px"
                  background="#FBCED3"
                  onClick={signup}
                  disabled={true}
                >
                  회원가입
                </Button_Type_A>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
