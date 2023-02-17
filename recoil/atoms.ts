import { Dayjs } from "dayjs";
import { atom, selector } from "recoil";
import { getInterestingDate, now } from "../libs/utils/dateUtils";
import { IAttendence, IParticipation } from "../models/vote";
import { noticeData } from "../storage/noticeData";

/* Vote */

export const voteDateState = atom<Dayjs>({
  key: "date",
  default: getInterestingDate(),
});

export const studyDateState = atom<"passed" | "today" | "not passed">({
  key: "studyDate",
  default: "today",
});

export const isAttendingState = atom({
  key: "isAttending",
  default: false,
});

export const isStudyOpenState = atom({
  key: "studyOpen",
  default: false,
});

export const isUserAttendState = atom({
  key: "userAttend",
  default: false,
});
export const isShowVoterState = atom({
  key: "isShowVoter",
  default: false,
});
export const isShowOpenResultState = atom({
  key: "isShowOpenResult",
  default: false,
});

export const voteStatusState = selector<
  "Closed" | "Check" | "Join" | "Vote" | "Voted" | "Complete"
>({
  key: "voteStatus",
  get: ({ get }) => {
    const studyDate = get(studyDateState);
    const isAttending = get(isAttendingState);
    const isUserAttend = get(isUserAttendState);
    const isStudyOpen = get(isStudyOpenState);
    if (studyDate === "passed") return "Closed";
    if (studyDate === "not passed") {
      if (isAttending) return "Voted";
      return "Vote";
    }
    if (studyDate === "today") {
      if (now() > now().hour(14).minute(0)) {
        if (isAttending) return "Voted";
        return "Vote";
      }
      if (!isStudyOpen) return "Closed";
      if (isUserAttend) {
        if (isAttending) return "Check";
        return "Join";
      }
    }
  },
});

export const selectPlacesState = atom<any>({
  key: "selectPlaces",
  default: [],
});

/* Modal-Show */
interface IModalContext {
  OpenResult?: {
    attendences: IAttendence[];
  };
  Voter?: {
    attendences: IAttendence[];
  };
  StudyVote?: {
    participations: IParticipation[];
  };
}
export const modalContextState = atom<IModalContext>({
  key: "modalContext",
  default: {},
});

export const isShowUserInfoFormState = atom({
  key: "isUserInfoForm",
  default: false,
});

export const isShowStudyVoteModalState = atom({
  key: "isShowVoteStudyModal",
  default: false,
});

export const showVoterState = atom<Number>({
  key: "showVoterState",
  default: null,
});

export const ShowOpenResultState = atom<Number>({
  key: "showOpenResult",
  default: null,
});

export const isShowVoteCancleState = atom<Boolean>({
  key: "isShowVoteCancel",
  default: false,
});

export const isShowNotCompletedState = atom<Boolean>({
  key: "notCompleted",
  default: false,
});

/*  */
export const isCancelState = atom({
  key: "isCancel",
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

export const tempState = atom({
  key: "temp",
  default: 0,
});

export const change = selector({
  key: "change",
  get: ({ get }) => {
    const B = get(tempState);
    return B / 10;
  },
  set: ({ set }, newValue) => {
    set(tempState, newValue);
  },
});

export const gatherJoinState = atom({
  key: "gatherJoin",
  default: false,
});
