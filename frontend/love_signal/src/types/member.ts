export type team = {
  teamUUID: string;
  members: member[];
};

export type member = {
  nickname: string;
  age: number;
  description: string;
  imgSrc?: string;
};
