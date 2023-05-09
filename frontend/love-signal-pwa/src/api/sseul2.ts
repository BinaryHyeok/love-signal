import axios from "axios";

export const test = async (myMemberUUID: string) => {
  return await axios({
    method: "Get",
    url: `http://localhost:9000/member/${myMemberUUID}`,
  });
};

export const change = async (
  myMemberUUID: string,
  nickname: string,
  description: string
) => {
  return await axios({
    method: "Put",
    url: `http://localhost:9000/member`,
    data: {
      myMemberUUID: myMemberUUID,
      nickname: nickname,
      description: description,
    },
  });
};
