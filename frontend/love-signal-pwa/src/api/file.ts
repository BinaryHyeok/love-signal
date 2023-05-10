import axios from "axios";

const API_FILE_URL = process.env.REACT_APP_API_FILE;

//사진 변경하기.
export const changeMyImg = async (memberUUID: string, file: any) => {
  return await axios({
    method: "post",
    url: `${API_FILE_URL}/file/profile/${memberUUID}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: file,
  });
};

export const getMyImg = async (memberUUID: string) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_TEAM}/file/profile/${memberUUID}`,
  });
};
