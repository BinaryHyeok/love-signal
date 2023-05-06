export type team = {
  teamUUID: string;
  members: member[];
};

export type member = {
  nickname: string;
  age: number;
  description: string;
  profileImage: string;
};

//회원정보 조회시에 받아오는 데이터(굳이 필요한가 의문)
export type userInfo = {
  memberUUID: string;
  nickname: string;
  gender: string;
  age: number;
  description: string;
  teamUUID: string;
  teamLeader: boolean;
};
