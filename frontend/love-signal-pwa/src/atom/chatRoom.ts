import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { room } from "../types/room";

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const roomInfo = atom<room>({
  key: "roomInfo",
  default: { uuid: "" },
  effects_UNSTABLE: [persistAtom],
});
