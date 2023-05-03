import axios from "axios";

export const changeMyInfo = async (
  memberUUID: string,
  nickname: string,
  description: string
) => {
  return await axios({
    method: "put",
    url: "http://localhost:9005/member",
    data: {
      memberUUID: memberUUID,
      nickname: nickname,
      description: description,
    },
  });
};

export const changeMyImg = async () => {
  return await axios({
    method: "post",
    url: "http://localhost:9005/file/profile",
    data: {},
  });
};

export const getMyImg = async (memberUUID: string) => {
  return await axios({
    method: "get",
    url: `http://localhost:9005/file/profile/${memberUUID}`,
  });
};
