import { member } from "./member";

export type chat = {
  roomType?: string;
  isMe?: boolean;
  redis_message_id?: number;
  roomUUID?: string;
  type?: string;
  nickname?: string;
  content?: string;
  notReadperson?: number;
  uuid?: string;
  createdDate?: string;
  updatedDate?: string;
  expired?: String;
  notReadPerson?: string[];
  selectOrShareInfo?: selectOrShareInfo;
  showNick?: string;
};

export type roomChatList = {
  [key: string]: chat[];
};

export type selectOrShareInfo = {
  nicknames?: string[];
  profileUrls?: string[];
  selected?: string;
  memberList?: member[];
};
