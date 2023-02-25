import { atom, selector } from "recoil";
import { ICategory } from "../pages/members";

export const isShowMemberInfoState = atom({
  key: "isShowMemberInfo",
  default: false,
});

export const categoryState = atom<ICategory>({
  key: "membersCategory",
  default: { name: "registerDate", status: "" },
});
