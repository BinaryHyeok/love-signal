import axios from "axios";
import cookie from "react-cookies";

//회원정보 수정
export const changeMyInfo = async (
  memberUUID: string,
  nickname: string,
  description: string
) => {
  return await axios({
    method: "put",
    url: `${process.env.REACT_APP_API}/member`,
    data: {
      memberUUID: memberUUID,
      nickname: nickname,
      description: description,
    },
  });
};

//회원탈퇴
export const withdrawMember = async (memberUUID: string) => {
  return await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API}/member/${memberUUID}`,
  });
};

//회원정보 조회
export const inquireMember = async (
  memberUUID: string,
  atk: string,
  kID: string
) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/member/${memberUUID}`,
    headers: {
      "X-Auth_Token": atk,
      // "X-Auth_ID": kID,
    },
  });
};

export const duplicateCheck = async (nickname: string) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_AUTH}/auth/check/nickname/${nickname}`,
  });
};

//카카오 로그인시 반환할때 하는 부분.
export const login = async (query: string) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_AUTH}/auth/sign-in`,
    params: { authorizationCode: query },
  });
};
// memberUUID //회원가입 안된사람이면 null 값
// kakaoUUID //카카오 UUID //recoil 저장
// accessToken //AccessToken //recoil 저장
// accessTokenExpireTime // AcessToken 만료시간 //recoil 저장
// refreshToken //리프레시 토큰 //쿠키 저장

//회원가입 버튼 클릭(Signup  request (nickname, gender, birth, description)
export const signUp = async (
  nickname: string,
  gender: string,
  birth: string,
  description: string,
  atk: string
) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_AUTH}/auth/sign-up`,
    headers: {
      "X-Auth_Token": atk,
      "X-Auth_ID": "kakaoID,",
    },
    data: {
      nickname: nickname,
      gender: gender,
      birth: birth,
      description: description,
    },
  });
};

//accessToken이 만료되어 refreshToken을 보내주는 함수입니다.
export const expireATK = async (myrtk: string) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_AUTH}/auth/refresh`,
    headers: {
      "X-Auth_Token": myrtk,
    },
  });
};
