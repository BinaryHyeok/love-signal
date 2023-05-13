import axios from "axios";

//채팅 목록 불러오기
export const getChatList = async (uuid: string, atk: string, kID: string) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/chat/messages/${uuid}`,
    headers: {
      "X-Auth_Token": atk,
      "X-Auth_ID": kID,
    },
  });
};

//채팅에 이성팀 공유
export const shareTeam = async (userUUID: string, teamUUID: string) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/chat/share`,
    data: {
      userUUID: userUUID,
      teamUUID: teamUUID,
    },
    // headers :{
    //   "X-Auth_Token" : atk,
    //   "X-Auth_ID" : kID
    // }
  });
};
