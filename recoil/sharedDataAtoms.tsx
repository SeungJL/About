import { atom } from "recoil";
import { IGatherContent } from "../types/gather";
import { IRegisterForm } from "../types/user";

export const sharedGatherDataState = atom<IGatherContent>({
  key: "sharedGatherData",
  default: null,
});
export const sharedRegisterFormState = atom<IRegisterForm>({
  key: "sharedRegisterForm",
  default: null,
});
