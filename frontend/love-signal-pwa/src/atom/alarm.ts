import { atom } from "recoil";

export const alarmModal = atom<boolean>({
  key: "alarmModal",
  default: false,
});

export const alarmModalAnimation = atom<boolean>({
  key: "alarmModalAnimation",
  default: false,
});

export const timeState = atom({
  key: "timeState",
  default: null,
});
