import { atom, selector } from "recoil";
import { INoticeState } from "../models/notice";

import { noticeData } from "../storage/noticeData";

export const noticeState = atom<INoticeState[]>({
  key: "notices",
  default: noticeData,
});
export const noticeCategoryState = atom({
  key: "noticeCategory",
  default: "rule",
});
export const noticeSelector = selector({
  key: "noticeSelector",
  get: ({ get }) => {
    const notices = get(noticeState);
    const category = get(noticeCategoryState);
    return notices.filter((notice) => notice.category === category);
  },
});

export const isWriteState = atom({
  key: "isWrite",
  default: false,
});
