import { atom } from "recoil";
import { IGatherWriting } from "../types/page/gather";
import { IUser, IUserRegisterFormWriting } from "../types/user/user";

export const sharedGatherWritingState = atom<IGatherWriting>({
  key: "sharedGatherWritingState",
  default: null,
});
export const sharedRegisterFormState = atom<IUserRegisterFormWriting | IUser>({
  key: "sharedRegisterFormState",
  default: null,
});
