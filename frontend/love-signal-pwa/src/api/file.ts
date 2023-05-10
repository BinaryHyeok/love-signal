import axios from "axios";

const API_FILE_URL = process.env.REACT_APP_API_FILE;

//사진 변경하기.
export const changeMyImg = async (
  memberUUID: string,
  file: any,
  atk: string,
  kID: string
) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/file/profile/${memberUUID}`,
    data: file,
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Auth_Token": atk,
      "X-Auth_ID": kID,
    },
  });
};

export const getMyImg = async (memberUUID: string) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/file/profile/${memberUUID}`,
  });
};
