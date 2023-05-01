import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

//나중에 여러개 저장할때 다시 해봐야할 것 같다. 원하는방식이 아니야..
const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const footerIdx = atom<number>({
  key: "footerIdx",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
