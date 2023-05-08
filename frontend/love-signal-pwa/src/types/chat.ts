export type chat = {
  roomType?: string;
  isMe?: boolean;
  //
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
  selectOrShareInfo?: object;
};
