import axios from "axios";

//사진 변경하기.
export const changeMyImg = async (memberUUID: string, file: any) => {
  return await axios({
    method: "post",
    url: `http://k8b309.p.ssafy.io:8000/file/profile/${memberUUID}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: file,
  });
};

export const getMyImg = async (memberUUID: string) => {
  return await axios({
    method: "get",
    url: `http://k8b309.p.ssafy.io:8000/file/profile/${memberUUID}`,
  });
};
