import axios from "axios";
import { member, signupMember } from "../types/member";

//회원정보 수정
export const changeMyInfo = async (
  memberUUID: string,
  nickname: string,
  description: string
) => {
  return await axios({
    method: "put",
    url: "http://localhost:9000/member",
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
    url: `http://localhost:9000/member/${memberUUID}`,
  });
};

//회원정보 조회
export const inquireMember = async (memberUUID: string) => {
  return await axios({
    method: "get",
    url: `http://localhost:9000/member/${memberUUID}`,
  });
};

export const duplicateCheck = async (nickname: string) => {
  return await axios({
    method: "get",
    url: `http://localhost:8888/auth/check/nickname/${nickname}`,
  });
};

//카카오 로그인시 반환할때 하는 부분.
export const login = async (query: string) => {
  return await axios({
    method: "post",
    url: `http://localhost:8888/sign-in`,
  });
};
// memberUUID //회원가입 안된사람이면 null 값
// kakaoUUID //카카오 UUID //recoil 저장
// accessToken //AccessToken //recoil 저장
// accessTokenExpireTime // AcessToken 만료시간 //recoil 저장
// refreshToken //리프레시 토큰 //쿠키 저장

//회원가입 버튼 클릭(Signup  request (nickname, gender, birth, description)
export const signUp = async (member: signupMember) => {
  return await axios({
    method: "post",
    url: `http://localhost:8888/sign-up`,
    headers: {
      "X-Auth_Token": "Access-Token",
    },
    data: {
      member: member,
    },
  });
};

//memberUUID //이것만 줌.
