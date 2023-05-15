import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { kid, myatk, myatkET } from "../../atom/member";
import cookie from "react-cookies";
import { expireATK } from "../../api/auth";

type propsType = {
  children: any;
};
//SignUp,Main을 제외한 모든 페이지에 다 들어가야 합니다.
const ATKFilter: React.FC<propsType> = ({ children }) => {
  const navigate = useNavigate();

  const [atk, setATK] = useRecoilState<string>(myatk);
  const [atkET, setAtkET] = useRecoilState<Date>(myatkET);
  const [, setKakaoId] = useRecoilState<string>(kid);

  useEffect(() => {
    expireCompare();
  }, []);

  const expireCompare = () => {
    const date = new Date();
    const rtk = cookie.load("rtk");
    const myET = new Date(atkET);

    if (rtk === undefined) {
      if (atk === "") {
        //로그인 페이지로 이동시켜야되는데 localStorage의 값 비워주기.
        localStorage.removeItem("localStorage");
        navigate("/");
      } else {
        if (date > myET) {
          //내 atk의 만료시간이 끝났기 때문에 refreshToken을 보내줘.
          reissueToken(rtk);
        }
      }
    } else {
      //rtk가 존재합니다. 이때 atk구분하기.
      if (atk !== "") {
        if (date > myET) {
          reissueToken(rtk);
        }
      } else {
        reissueToken(rtk);
      }
    }
  };

  const reissueToken = (rtk: string) => {
    expireATK(rtk)
      .then((res) => {
        setATK(res.data.body.accessToken);
        let nowDate: Date = new Date();
        nowDate.setSeconds(
          nowDate.getSeconds() + res.data.body.accessTokenExpireTime
        );
        setAtkET(nowDate);
        setKakaoId(res.data.body.kakaoId);
        if (res.data.body.refreshToken !== null) {
          //rtk가 존재한다면?
          setCookie(
            res.data.body.refreshToken,
            res.data.body.refreshTokenExpireTime
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setCookie = (rtk: string, rTET: number) => {
    const expires = new Date(); //현재 시간 받아오고.
    expires.setSeconds(expires.getSeconds() + rTET); //현재 시간에 만료시간의 초 + 만료기간 더해주기
    cookie.save("rtk", rtk, {
      path: "/", //일단 모든 경로에서 전부 쿠키 쓸수있게 해놓기.
      expires, //만료기간 설정
      secure: true, //보안 설정
      //   httpOnly: true, //보안 설정
    });
  };
  return <>{children}</>;
};

export default ATKFilter;
