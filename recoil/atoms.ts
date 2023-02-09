import { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { atom, selector } from "recoil";
import { strToDate } from "../libs/utils/dateUtils";
import { gatherTest } from "../storage/gathers";
import { noticeData } from "../storage/noticeData";

/* About Page */

export const dateState = atom<Dayjs>({
  key: "date",
  default: null,
});

export const showVoterState = atom<Number>({
  key: "showVoterState",
  default: null,
});

export const showOpenResultState = atom<Number>({
  key: "showOpenResult",
  default: null,
});

export const attendingState = atom<Number>({
  key: "attendingState",
  default: null,
});

export const isShowVoteCancleState = atom<Boolean>({
  key: "isShowVoteCancel",
  default: false,
});

export const isNotCompletedState = atom<Boolean>({
  key: "notCompleted",
  default: false,
});

/* Notice */
export const noticeState = atom<noticeState[]>({
  key: "notices",
  default: noticeData,
});
export const noticeCategory = atom({
  key: "noticeCategory",
  default: "notice",
});
export const noticeSelector = selector({
  key: "noticeSelector",
  get: ({ get }) => {
    const notices = get(noticeState);
    const category = get(noticeCategory);
    return notices.filter((notice) => notice.category === category);
  },
});

export enum Categories {
  "plan" = "plan",
  "complete" = "complete",
  "cancel" = "complete",
}

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});
export interface IgatherItem {
  date: string;
  text: string;
  id: number;
  category: Categories;
  join?: string;
  keys?: any;
}
export interface IGatherDate {}

export const gatherState = atom<IgatherItem[]>({
  key: "gatherItem",
  default: gatherTest,
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.plan,
});

export const gatherSelector = selector({
  key: "gatherSelector",
  get: ({ get }) => {
    const gathers = get(gatherState);
    const category = get(categoryState);
    return gathers.filter((gather) => gather.category === category);
  },
});

export const isWriteState = atom({
  key: "isWrite",
  default: false,
});
interface noticeState {
  category: string;
  text: string;
}

export const gatherIdState = atom({
  key: "gatherId",
  default: "",
});

export const isCancelState = atom({
  key: "isCancel",
  default: false,
});

export const isShowUserInfoForm = atom({
  key: "isUserInfoForm",
  default: true,
});
