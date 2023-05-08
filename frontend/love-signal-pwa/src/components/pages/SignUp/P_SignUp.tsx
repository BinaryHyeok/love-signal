import style from "./styles/SignUp.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M_SignUp_Profile from "./M_SignUp_Profile";
import M_SignUp_Birth from "./M_SignUp_Birth";
import M_SignUp_Nickname from "./M_SignUp_Nickname";
import A_MainLogo from "./A_MainLogo";
import M_SignUp_Introduce from "./M_SignUp_Introduce";
import { duplicateCheck, signUp } from "../../../api/auth";
import M_SignUp_Gender from "./M_SignUp_Gender";
import { signupMember } from "../../../types/member";
import { useRecoilState } from "recoil";
import { myMemberUUID } from "../../../atom/member";
import { changeMyImg } from "../../../api/file";

const P_SignUp = () => {
  const [birth, setBirth] = useState<string>("19970220");
  const [nickname, setNickname] = useState<string>("");
  const [description, setDiscription] = useState<string>("나는 손종효다.");
  const [gender, setGender] = useState<string>("M");
  const [checkNickname, setCheckNickname] = useState<boolean>(false);
  const [checkProfileOk, setCheckProfileOk] = useState<boolean>(false);
  const [checkNickOk, setCheckNickOk] = useState<boolean>(false);
  const [checkBirthOk, setCheckBirthOk] = useState<boolean>(false);
  const [checkGenderOk, setCheckGenderOk] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("code");
    if (queryParam) {
      //쿼리 저장.
      setQuery(queryParam);
    }
  }, []);

  const navigate = useNavigate();

  const initialize: signupMember = {
    nickname: "",
    gender: "",
    birth: "",
    description: "",
  };

  const [user, setUser] = useState<signupMember>(initialize);
  const [myImage, setMyImage] = useState<FormData>(new FormData());
  const [, setMemberUUID] = useRecoilState<string>(myMemberUUID);

  const handleProfile = () => {
    setCheckProfileOk(!checkProfileOk);
  };

  const handleNickname = () => {
    setCheckNickOk(!checkNickOk);
  };

  const handleBirth = () => {
    setCheckBirthOk(!checkBirthOk);
  };

  const handleGender = () => {
    setCheckGenderOk(!checkGenderOk);
  };

  //중복확인 해주는 함수입니다.
  const duplecheck = () => {
    duplicateCheck(nickname)
      .then((res) => {
        console.log(res);
        //닉네임 중복확인입니다.
        setCheckNickname(true); //중복확인 체크되었다는걸 말해줌.
      })
      .catch((err) => {
        console.log(err);
        //이미 있는 닉네임이면 안돼.
      });
  };

  //회원가입 버튼 클릭했을때
  const signup = () => {
    setUser({
      nickname: nickname,
      gender: gender,
      birth: birth,
      description: description,
    }); //여기서 setUser를 하면 비동기라 아래 user에 값이 없을것.
    //이때 회원가입 axios 발동
    signUp(user)
      .then(async (res) => {
        //성공하면 memberUUID 반환.
        setMemberUUID(res.data.body.memberUUID);
        //성공한 후 이때 사진 저장시켜주어야함.
        await changeMyImg(res.data.body.memberUUID, myImage);

        //사진 저장까지하고 회원가입 되었으니 manual 페이지로 이동.
        navigate("/Manual");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`${style.Container} diagonal-gradient`}>
      <div className={style.center}>
        <A_MainLogo />
        {!checkProfileOk && !checkNickOk && !checkBirthOk && !checkGenderOk && (
          <M_SignUp_Profile onClick={handleProfile} setMyImage={setMyImage} />
        )}
        {checkProfileOk && !checkNickOk && !checkBirthOk && !checkGenderOk && (
          <M_SignUp_Nickname
            nickname={nickname}
            onClick1={duplecheck}
            onClick2={handleNickname}
            setNickname={setNickname}
            setCheckNickname={setCheckNickname}
          />
        )}
        {checkProfileOk && checkNickOk && !checkBirthOk && !checkGenderOk && (
          <M_SignUp_Birth
            birth={birth}
            onClick={handleBirth}
            setBirth={setBirth}
          />
        )}
        {checkProfileOk && checkNickOk && checkBirthOk && !checkGenderOk && (
          <M_SignUp_Gender
            gender={gender}
            onClick={handleGender}
            setGender={setGender}
          />
        )}
        {checkProfileOk && checkNickOk && checkBirthOk && checkGenderOk && (
          <M_SignUp_Introduce
            description={description}
            onClick={signup}
            setDiscription={setDiscription}
          />
        )}
      </div>
    </div>
  );
};

export default P_SignUp;
