import axios from "axios";

//채팅방 목록 불러오기
export const getChatRommList = async () => {
  return await axios({
    method: "get",
    url: "http://localhost:9005/room",
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//채팅방 불러오기
export const getChatRomm = async (id: string | number) => {
  return await axios({
    method: "get",
    url: `http://localhost:9005/room/${id}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//채팅방 생성
export const makeChatRoom = async () => {
  return await axios({
    method: "post",
    url: `http://localhost:9005/room`,
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
    url: `http://localhost:9005/room/${id}`,
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
    url: `http://localhost:9005/room/${id}/room-name/${roomname}`,
    data: {},
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};