import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const fcmToken = atom<string>({
  key: "fcmToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
