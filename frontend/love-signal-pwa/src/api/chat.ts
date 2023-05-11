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
