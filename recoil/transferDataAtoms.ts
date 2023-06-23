import { atom } from "recoil";
import { IGatherContent } from "../types/gather";
import { IUser } from "../types/user";

export const transferUserDataState = atom<IUser>({
  key: "transferUserData",
  default: null,
});
export const transferGatherDataState = atom<IGatherContent>({
  key: "transferGatherData",
  default: null,
});
