import { atom } from "recoil";
import { IUser } from "../types/user";

export const userDataState = atom<IUser>({
  key: "userData",
  default: null,
});

export const beforePageState = atom({
  key: "beforePage",
  default: "",
});
