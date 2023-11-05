import { atom } from "recoil";
import { IGatherWriting } from "../types/page/gather";
import { IRegisterForm, IUser } from "../types/user/user";

export const sharedGatherWritingState = atom<IGatherWriting>({
  key: "sharedGatherWritingState",
  default: null,
});
export const sharedRegisterFormState = atom<IRegisterForm | IUser>({
  key: "sharedRegisterFormState",
  default: null,
});
