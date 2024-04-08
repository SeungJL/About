import { atom } from "recoil";
import { IDailyCheckWinList } from "../constants/serviceConstants/dailyCheckConstatns";
import { IGiftEntry } from "../pages/store";
import { IGroup } from "../types2/page/group";
import { MemberGroup } from "../types2/page/member";
import { Alphabet } from "../types2/serviceTypes/alphabetTypes";
import { IUser, IUserSummary } from "../types2/userTypes/userInfoTypes";

export const transferAlphabetState = atom<Alphabet>({
  key: "TransferAlphabet",
  default: null,
});

export const transferDailyCheckWinState = atom<IDailyCheckWinList>({
  key: "TransferDailyCheckWin",
  default: null,
});
export const transferShowDailyCheckState = atom<boolean>({
  key: "TransferShowDailyCheck",
  default: true,
});

export const transferUserSummaryState = atom<IUserSummary | IUser>({
  key: "TransferUserSummary",
  default: null,
});

export const transferGroupDataState = atom<IGroup>({
  key: "transferGroupDataState",
  default: null,
});

export const transferMemberDataState = atom<{
  section: MemberGroup | "all";
  members: IUser[];
}>({
  key: "transferMemberDataState",
  default: null,
});
interface ItransferStoreGiftData {
  data: IGiftEntry;
  isActive: boolean;
}

export const transferStoreGiftDataState = atom<ItransferStoreGiftData>({
  key: "transferStoreGiftDataState",
  default: null,
});
