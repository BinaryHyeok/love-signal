import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

type Type_RoomInfo = {
  id?: string;
  title?: string;
  memberCount?: string;
  type?: string;
};

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const roomInfo = atom<Type_RoomInfo>({
  key: "roomInfo",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
