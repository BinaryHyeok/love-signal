import axios from "axios";

//채팅 목록 불러오기
export const getChatList = async (uuid: string) => {
  return await axios({
    method: "get",
    url: `http://localhost:8080/chat/messages/${uuid}`,
    // headers: {
    //   "X-Auth_Token": "AccessToken",
    // },
  });
};
