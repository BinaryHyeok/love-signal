import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { chat } from "../types/chat";

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const chatList = atom<chat[]>({
  key: "chatList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
