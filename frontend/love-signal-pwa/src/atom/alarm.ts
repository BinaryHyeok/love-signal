import { atom } from "recoil";

export const alarmModal = atom<boolean>({
  key: "alarmModal",
  default: false,
});

export const modalState = atom({
  key: "modalState",
  default: {
    isOpen: false,
    animate: false,
  },
});
