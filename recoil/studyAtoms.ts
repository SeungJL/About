import { Dayjs } from "dayjs";
import { atom, selector } from "recoil";
import { getInterestingDate, now } from "../libs/utils/dateUtils";

export const isCancelState = atom({
  key: "isCancel",
  default: false,
});

export const voteDateState = atom<Dayjs>({
  key: "date",
  default: getInterestingDate(),
});

export const studyDateState = atom<"passed" | "default" | "not passed">({
  key: "studyDate",
  default: "default",
});

export const isVotingState = atom({
  key: "isVoting",
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
export const AAState = atom({
  key: "AA",
  default: false,
});

/*
 today = defaultVoteDate
 
 [defaultVoteDate]   
  
  자정 ~ 오후 2시: 
      -> today=today
    
  오후 2시 ~ 오후 6시
      -> 참여자: today=today // 오늘꺼를 체크한다.
      -> 미참여자: today=tomorrow // 내일꺼를 투표한다.

  오후 6시 ~ 오후 12시
      -> today=tomorrow
      -> 오후 11시 - 결과 발표
*/
export const voteStatusState = selector<
  "Closed" | "Check" | "Join" | "Vote" | "Voted" | "Completed"
>({
  key: "voteStatus",
  get: ({ get }) => {
    const studyDate = get(studyDateState);
    const isVoting = get(isVotingState);
    const isUserAttend = get(isUserAttendState);
    const isStudyOpen = get(isStudyOpenState);
    const isAttendCheck = get(isAttendCheckState);
    const attendedUserNextVoteTime = now().hour(18);
    const voteEndTime = now().hour(23);
    const voteStartTime = now().hour(14);
    const current = now();

    if (studyDate === "default") {
      // 첫 화면에 보이고 있는 날짜
      if (current > voteEndTime || current < voteStartTime) {
        // 오후 11시 ~ 다음 날 오후 2시
        if (!isStudyOpen) return "Closed";
        if (isUserAttend) {
          if (isAttendCheck) return "Completed";
          return "Check";
        } // 오후 11시 ~ 다음 날 오후 2시까지 참여자
        return "Join"; // 오후 11시 ~ 다음 날 오후 2시까지 미참여자
      }
      if (!isUserAttend) {
        if (isVoting) return "Voted";
        return "Vote";
      } // 오후 2시 이후 미참여자. 미참여자 끝.

      if (current < attendedUserNextVoteTime) {
        //오후 2시 ~ 오후 6시 참여자
        return "Check";
      } else {
        //오후 6시 ~ 오후 12시
        if (isVoting) return "Voted";
        return "Vote";
      }
    }
    if (studyDate === "passed") {
      if (isUserAttend) return "Check";
      return "Closed";
    } else {
      if (isVoting) return "Voted";
      else return "Vote";
    }
  },
});

export const isShowPrivacyPolicyState = atom({
  key: "privacyPolicy",
  default: false,
});
export const isShowRegisterFormState = atom({
  key: "RegisterForm",
  default: false,
});
export const selectPlacesState = atom<any>({
  key: "selectPlaces",
  default: [],
});
