import { Dayjs } from "dayjs";
import { atom, selector } from "recoil";
import { getInterestingDate, now } from "../libs/utils/dateUtils";
import { IUser } from "../models/user";
import { IAttendence, IParticipation } from "../models/vote";
import { noticeData } from "../storage/noticeData";

export const isShowPrivacyPolicyState = atom({
  key: "privacyPolicy",
  default: false,
});
export const isShowRegisterFormState = atom({
  key: "RegisterForm",
  default: true,
});

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
export const isAttendCheckState = atom({
  key: "attendCheck",
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
  "Closed" | "Check" | "Join" | "Vote" | "Voted" | "Completed"
>({
  key: "voteStatus",
  get: ({ get }) => {
    const studyDate = get(studyDateState);
    const isAttending = get(isAttendingState);
    const isUserAttend = get(isUserAttendState);
    const isStudyOpen = get(isStudyOpenState);
    const isAttendCheck = get(isAttendCheckState);
    if (isAttendCheck) return "Completed";
    if (studyDate === "passed") {
      if (isUserAttend && now() < now().hour(18)) {
        if (isAttending) return "Check";
        return "Join";
      }
      return "Closed";
    }
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
  ProfileImg?: {
    user: IUser;
  };
}
export const modalContextState = atom<IModalContext>({
  key: "modalContext",
  default: {},
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

export const isShowUserInfoSmState = atom({
  key: "isShowUserInfoSm",
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
