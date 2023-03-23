import { Dayjs } from "dayjs";
import { atom, selector } from "recoil";
import { getInterestingDate, now } from "../libs/utils/dateUtils";

////////////////////////////////////////////////
export const studyChoiceState = atom<{
  firstChoice: string;
  secondChoices?: string[];
}>({
  key: "studyChoice",
  default: { firstChoice: "", secondChoices: [] },
});

export const isStudyOpenState = atom({
  key: "studyOpen",
  default: false,
});
export const isUserAttendState = atom({
  key: "userAttend",
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

//////////////////////////////////////////////

export const isCancelState = atom({
  key: "isCancel",
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

export const isShowPrivacyPolicyState = atom({
  key: "privacyPolicy",
  default: false,
});
export const isShowRegisterFormState = atom({
  key: "RegisterForm",
  default: false,
});
