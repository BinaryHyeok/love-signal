import { member } from "./member";

export type room = {
  memberCount?: string;
  lastMsgTime?: string;
  members?: member[];
  //
  uuid?: string;
  type?: string;
  roomName?: string;
  lastChat?: string;
  notReadChat?: string; // number일 수도 있음
  createdDate?: string; // back에서 localDateTime으로 보내줌
  updatedDate?: string; // back에서 localDateTime으로 보내줌
  expired?: string;
};
