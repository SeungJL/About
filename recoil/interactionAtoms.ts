import { atom } from "recoil";
import { IGatherContent } from "../types/gather";
import { IUser } from "../types/user";

export const userDataState = atom<IUser>({
  key: "userData",
  default: null,
});

export const beforePageState = atom({
  key: "beforePage",
  default: "",
});

export const isProfileEditState = atom({
  key: "isProfileEdit",
  default: false,
});

export const gatherDataState = atom<IGatherContent>({
  key: "gatherData",
  default: null,
});

export const gatherIdCntState = atom<number>({
  key: "gatherIdCnt",
  default: null,
});
