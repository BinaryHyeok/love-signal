import axios from "axios";

const API_CHAT_URL = process.env.REACT_APP_API_CHAT;
const API_TEAM_URL = process.env.REACT_APP_API_TEAM;

//채팅방 목록 불러오기
export const getChatRoomList = async (uuid: string) => {
  return await axios({
    method: "get",
    url: `${API_CHAT_URL}/chatRoom/${uuid}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//채팅방 불러오기
export const getChatRoom = async (id: string | number) => {
  return await axios({
    method: "get",
    url: `${API_CHAT_URL}/chatRoom/${id}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//채팅방 생성
export const makeChatRoom = async () => {
  return await axios({
    method: "post",
    url: `${API_CHAT_URL}/chatRoom`,
    data: {},
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//채팅방 삭제
export const deleteChatRoom = async (id: string | number) => {
  return await axios({
    method: "delete",
    url: `${API_TEAM_URL}/room/${id}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//채팅방 이름 수정
export const modifyChatRoomName = async (
  id: string | number,
  roomname: string
) => {
  return await axios({
    method: "patch",
    url: `${API_TEAM_URL}/room/${id}/room-name/${roomname}`,
    data: {},
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};
