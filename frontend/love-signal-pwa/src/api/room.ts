import axios from "axios";

//채팅방 목록 불러오기
export const getChatRoomList = async (uuid: string) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/chatRoom/${uuid}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//채팅방 불러오기
export const getChatRoom = async (id: string | number) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/chatRoom/${id}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};

//채팅방 생성
export const makeChatRoom = async () => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/chatRoom`,
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
    url: `${process.env.REACT_APP_API}}/room/${id}`,
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
    url: `${process.env.REACT_APP_API}/room/${id}/room-name/${roomname}`,
    data: {},
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};
