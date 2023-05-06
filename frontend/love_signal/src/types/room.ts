import { member } from "./member";

export type room = {
  id: string;
  title: string;
  // type: string;
  memberCount: string;
  lastMsgTime?: string;
  members?: member[];
  //
  UUID?: string;
  type: string;
  roomName: string;
  lastChat?: string;
  notReadChat?: string; // number일 수도 있음
  createdDate?: string; // back에서 localDateTime으로 보내줌
  updatedDate?: string; // back에서 localDateTime으로 보내줌
  expired?: string;
};
