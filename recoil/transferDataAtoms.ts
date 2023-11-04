import { atom } from "recoil";
import { IGiftEntry } from "../pages/store";
import { IGather } from "../types/page/gather";
import { MemberGroup } from "../types/page/member";

import { IParticipation } from "../types/study/studyDetail";
import { Alphabet } from "../types/user/collections";
import { IUser } from "../types/user/user";

export const transferUserDataState = atom<IUser>({
  key: "transferUserDataState",
  default: null,
});
export const transferGatherDataState = atom<IGather>({
  key: "transferGatherDataState",
  default: null,
});

export const transferStudyDataState = atom<IParticipation[]>({
  key: "transferStudyDataState",
  default: null,
});

export const transferMemberDataState = atom<{
  section: MemberGroup | "all";
  members: IUser[];
}>({
  key: "transferMemberDataState",
  default: null,
});

export const transferStudySpaceDataState = atom<IParticipation>({
  key: "transferStudySpaceDataState",
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
export const transferAlphabetState = atom<Alphabet>({
  key: "transferAlphabetStateState",
  default: null,
});
