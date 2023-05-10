import axios from "axios";
import { member, signupMember } from "../types/member";

const API_AUTH_URL = process.env.REACT_APP_API_AUTH;
const API_MEMBER_URL = process.env.REACT_APP_API_MEMBER;

//회원정보 수정
export const changeMyInfo = async (
  memberUUID: string,
  nickname: string,
  description: string
) => {
  return await axios({
    method: "put",
    url: "http://k8b309.p.ssafy.io:8000/member",
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
    url: `http://k8b309.p.ssafy.io:8000/member/${memberUUID}`,
  });
};

//회원정보 조회
export const inquireMember = async (memberUUID: string) => {
  return await axios({
    method: "get",
    url: `http://k8b309.p.ssafy.io:8000/member/${memberUUID}`,
  });
};

export const duplicateCheck = async (nickname: string) => {
  return await axios({
    method: "get",
    url: `http://k8b309.p.ssafy.io:9999/auth/check/nickname/${nickname}`,
  });
};

//카카오 로그인시 반환할때 하는 부분.
export const login = async (query: string) => {
  return await axios({
    method: "post",
    url: `http://k8b309.p.ssafy.io:9999/auth/sign-in`,
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
    url: `http://k8b309.p.ssafy.io:9999/auth/sign-up`,
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

//memberUUID //이것만 줌.
