import dayjs, { Dayjs } from "dayjs";
import { atom, selector } from "recoil";
import { MY_TODAY_STUDY_FIXED } from "../constants/keys/localStorage";
import { dayjsToStr } from "../helpers/dateHelpers";
import { getStudyDate } from "../helpers/studyHelpers";
import {
  IParticipation,
  IStudyStartTime,
  StudyDateStatus,
} from "../types/study/studyDetail";
import { userAccessUidState } from "./userAtoms";

export const voteDateState = atom<Dayjs>({
  key: "voteDate",
  default: null,
});

export const studyDateStatusState = selector<StudyDateStatus>({
  key: "studyDateStatus",
  get: ({ get }) => {
    const voteDate = get(voteDateState);
    if (voteDate) return getStudyDate(voteDate);
  },
});

export const participationsState = atom<IParticipation[]>({
  key: "participations",
  default: null,
});

export const myVotingState = selector<IParticipation[]>({
  key: "myVoting",
  get: ({ get }) => {
    const uid = get(userAccessUidState);
    const participations = get(participationsState);
    if (!uid || !participations) return null;
    const temp = [];
    participations.forEach((participation) => {
      participation.attendences.forEach((who) => {
        if (who.user.uid === uid) temp.push(participation);
      });
    });
    if (temp.length) return temp;
    return null;
  },
});

export const myStudyState = selector<IParticipation>({
  key: "myStudy",
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

export const studyStartTimeArrState = atom<IStudyStartTime[]>({
  key: "studyStartTimeArr",
  default: null,
});

export const studyStartTimeState = selector<IStudyStartTime>({
  key: "StudyStartTime",
  get: ({ get }) => {
    const studyStartTimeArr = get(studyStartTimeArrState);
    const myStudyPlaceId = get(myStudyState)?.place?._id;
    if (!studyStartTimeArr || !myStudyPlaceId) return null;
    const myStudyStartTime = studyStartTimeArr.find(
      (item) => item.place_id === myStudyPlaceId
    );
    return myStudyStartTime;
  },
});
