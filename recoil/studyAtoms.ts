import { Dayjs } from "dayjs";
import { atom, RecoilEnv, selector } from "recoil";
import { IParticipation, StudyDate } from "../types/study/studyDetail";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const myStudyState = atom<IParticipation>({
  key: "MyStudy",
  default: null,
});
export interface IStudyStartTime {
  place_id: string;
  startTime: Dayjs;
}

export const studyStartTimeArrState = atom<IStudyStartTime[]>({
  key: "StudyStartTimeArr",
  default: null,
});

export const studyStartTimeState = selector<IStudyStartTime>({
  key: "StudyStartTime",
  get: ({ get }) => {
    const studyStartTimeArr = get(studyStartTimeArrState);
    const myStudyPlaceId = get(myStudyState)?.place?._id;
    const myStudyStartTime = studyStartTimeArr.find(
      (item) => item.place_id === myStudyPlaceId
    );
    return myStudyStartTime;
  },
});

export const participationsState = atom<IParticipation[]>({
  key: "participationsState",
  default: null,
});

export const voteDateState = atom<Dayjs>({
  key: "voteDateState",
  default: null,
});

export const isVotingState = atom({
  key: "isVotingState",
  default: false,
});

export const studyDateStatusState = atom<StudyDate>({
  key: "studyDateStatusState",
  default: null,
});
