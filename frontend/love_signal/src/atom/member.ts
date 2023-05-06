import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

//나중에 여러개 저장할때 다시 해봐야할 것 같다. 원하는방식이 아니야..
const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

//멤버의 개인UUID를 넣어줄 recoil입니다.
export const myMemberUUID = atom<string>({
  key: "memberUUID",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//멤버의 팀UUID를 넣어줄 recoil입니다.
export const myTeamUUID = atom<string>({
  key: "teamUUID",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//자신의 atk를 저장할 recoil입니다.
export const mytk = atom<string>({
  key: "tk",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
