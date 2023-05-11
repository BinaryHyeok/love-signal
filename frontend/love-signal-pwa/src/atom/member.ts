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
export const myatk = atom<string>({
  key: "atk",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//카카오 로그인시 Access토큰 만료시간을 저장할 변수입니다.
export const myatkET = atom<Date>({
  key: "myatkET",
  default: new Date(),
  effects_UNSTABLE: [persistAtom],
});

//자신의 KaKaoUUID를 저장할 recoil입니다.
export const kid = atom<string>({
  key: "kid",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//자신의 nickname을 저장할 recoil입니다.
export const nickname = atom<string>({
  key: "nickname",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//나 자신이 리더인지를 확인할 recoil입니다.
export const imLeader = atom<boolean>({
  key: "leader",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const myGender = atom<string>({
  key: "gender",
  default: "M",
  effects_UNSTABLE: [persistAtom],
});

export const validRoomId = atom<boolean>({
  key: "validRoomId",
  default: false,
});

// export const copyRoodId = atom<boolean>({
//   key: "isCopy",
//   default: false,
// });
