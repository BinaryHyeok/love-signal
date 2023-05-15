import axios from "axios";

//회원정보 수정
export const changeMyInfo = async (
  memberUUID: string,
  nickname: string,
  description: string,
  atk: string,
  kID: string
) => {
  return await axios({
    method: "put",
    url: `${process.env.REACT_APP_API}/member`,
    data: {
      memberUUID: memberUUID,
      nickname: nickname,
      description: description,
    },
    headers: {
      "X-Auth_Token": atk,
      "X-Auth_ID": kID,
    },
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
      "X-Auth_ID": kID,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
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

// 푸시알림 on/off
export const setPushAlarmStatus = async (
  uuid: string,
  atk: string,
  kID: string,
  status: string
) => {
  return await axios({
    method: "put",
    url: `${process.env.REACT_APP_API}/member/${uuid}/receive-alarm?status=${status}`,
    headers: {
      "X-Auth_Token": atk,
      "X-Auth_ID": kID,
    },
  });
};
