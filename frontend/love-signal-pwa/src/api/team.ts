import axios from "axios";

const API_TEAM_URL = process.env.REACT_APP_API_TEAM;

//동성 팀 생성
export const makeTeam = async (memberUUID: string) => {
  return await axios({
    method: "post",
    url: `http://k8b309.p.ssafy.io:8000/team/${memberUUID}`,
    data: {},
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//동성 팀 참가
export const joinTeam = async (memberUUID: string, teamUUID: string) => {
  return await axios({
    method: "post",
    url: `http://k8b309.p.ssafy.io:8000/team/${teamUUID}/join/${memberUUID}`,
    data: {},
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//동성 팀 탈퇴
export const withdrawTeam = async (memberUUID: string) => {
  return await axios({
    method: "delete",
    url: `http://k8b309.p.ssafy.io:8000/team/${memberUUID}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//자신의 팀 불러오기
export const getMyTeam = async (teamUUID: string) => {
  return await axios({
    method: "get",
    url: `http://k8b309.p.ssafy.io:8000/team/${teamUUID}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//이성팀 목록 불러오기
export const getOtherGenderTeam = async (
  gender: string,
  size: number,
  teamUUIDList: string[],
  atk: string,
  kID: string
) => {
  return axios({
    method: "post",
    url: `http://k8b309.p.ssafy.io:8000/team/opposite-gender/teams?gender=${gender}&size=${size}`,
    data: { teamUUIDList },
    headers: {
      "X-Auth_Token": atk,
      "X-Auth_ID": kID,
      "Access-Control-Allow-Origin": "*",
    },
  });
};

//미팅 신청받은 목록 불러오기
export const receivemeetingList = async (teamUUID: string) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/team/${teamUUID}/received-meetings`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//미팅 신청한 목록 불러오기
export const sendmeetingList = async (teamUUID: string) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/team/${teamUUID}/sent-meetings`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//미팅 신청하기
export const applyMeeting = async (
  teamUUID: string,
  oppositeTeamUUID: string
) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/team/${teamUUID}/send-meeting/${oppositeTeamUUID}`,
    data: {},
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//미팅 수락
export const acceptMeeting = async (
  teamUUID: string,
  oppositeTeamUUID: string
) => {
  return await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API}/${teamUUID}/accept-meeting/${oppositeTeamUUID}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//미팅 거절
export const rejectMeeting = async (
  teamUUID: string,
  oppositeTeamUUID: string
) => {
  return await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API}/team/${teamUUID}/reject-meeting/${oppositeTeamUUID}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};
