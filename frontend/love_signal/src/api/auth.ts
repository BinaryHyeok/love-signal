import axios from "axios";

//회원정보 수정
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

//회원탈퇴
export const withdrawMember = async (memberUUID: string) => {
  return await axios({
    method: "delete",
    url: `http://localhost:9005/member/${memberUUID}`,
  });
};

//회원정보 조회
export const inquireMember = async (memberUUID: string) => {
  return await axios({
    method: "get",
    url: `http://localhost:9005/member/${memberUUID}`,
  });
};

export const duplicateCheck = async (nickname: string) => {
  return await axios({
    method: "get",
    url: `http://localhost9005/member/check/nickname/${nickname}`,
  });
};
