import axios from "axios";

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
