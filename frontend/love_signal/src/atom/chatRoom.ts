import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const roomId = atom<string>({
  key: "roomId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
