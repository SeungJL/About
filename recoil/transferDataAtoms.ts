import { atom } from "recoil";
import { IGatherContent } from "../types/page/gather";
import { IStudy } from "../types/study/study";
import { IUser } from "../types/user/user";

export const transferUserDataState = atom<IUser>({
  key: "transferUserData",
  default: null,
});
export const transferGatherDataState = atom<IGatherContent>({
  key: "transferGatherData",
  default: null,
});

export const transferStudyDataState = atom<IStudy[]>({
  key: "transferStudyData",
  default: null,
});
