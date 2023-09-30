import { atom } from "recoil";
import { IGatherWriting } from "../types/page/gather";
import { IRegisterForm, IUser } from "../types/user/user";

export const sharedGatherWritingState = atom<IGatherWriting>({
  key: "sharedGatherWriting",
  default: null,
});
export const sharedRegisterFormState = atom<IRegisterForm | IUser>({
  key: "sharedRegisterForm",
  default: null,
});
