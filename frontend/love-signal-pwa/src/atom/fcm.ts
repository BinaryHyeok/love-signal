import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { FirebaseApp } from "@firebase/app";
import { Messaging } from "@firebase/messaging";

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const firebaseApp = atom<FirebaseApp>({
  key: "firebaseApp",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const firebaseMessaging = atom<Messaging>({
  key: "firebaseMessaging",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
