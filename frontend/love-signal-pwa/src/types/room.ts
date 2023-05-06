import { member } from "./member";

export type room = {
  id: string;
  title: string;
  type: string;
  memberCount: string;
  lastMsgTime?: string;
  members?: member[];
};
