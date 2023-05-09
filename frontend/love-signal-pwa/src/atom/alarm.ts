import { atom } from "recoil";

export const alarmModal = atom<boolean>({
  key: "alarmModal",
  default: false,
});
