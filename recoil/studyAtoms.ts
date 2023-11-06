import dayjs, { Dayjs } from "dayjs";
import { atom, RecoilEnv, selector } from "recoil";
import { MY_TODAY_STUDY_FIXED } from "../constants/keys/localStorage";
import { dayjsToStr } from "../helpers/dateHelpers";
import { getStudyDate } from "../helpers/studyHelpers";
import { IParticipation, StudyDateStatus } from "../types/study/studyDetail";
import { userInfoState } from "./userAtoms";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

//날짜
export const voteDateState = atom<Dayjs>({
  key: "VoteDate",
  default: null,
});

export const studyDateStatusState = selector<StudyDateStatus>({
  key: "StudyDateStatus",
  get: ({ get }) => {
    const voteDate = get(voteDateState);
    if (voteDate) return getStudyDate(voteDate);
  },
});

export const participationsState = atom<IParticipation[]>({
  key: "Participations",
  default: null,
});

export const myVotingState = selector<IParticipation[]>({
  key: "MyVoting",
  get: ({ get }) => {
    const userInfo = get(userInfoState);
    const participations = get(participationsState);
    if (!userInfo || !participations) return null;
    const temp = [];
    participations.forEach((participation) => {
      participation.attendences.forEach((who) => {
        if (who.user.uid === userInfo.uid) {
          temp.push(participation);
        }
      });
    });
    if (temp.length) return temp;
    return null;
  },
});

export const myStudyState = selector<IParticipation>({
  key: "MyStudy",
  get: ({ get }) => {
    const studyDateStatus = get(studyDateStatusState);
    const myVoting = get(myVotingState);
    if (!studyDateStatus || !myVoting) return null;

    const findStudy = myVoting.find((participation) => {
      if (["open", "free"].includes(participation.status)) {
        if (studyDateStatus === "today") {
          localStorage.setItem(MY_TODAY_STUDY_FIXED, dayjsToStr(dayjs()));
        }

        return true;
      }

      return false;
    });

    return findStudy || null;
  },
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
