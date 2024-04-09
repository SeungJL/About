import { atom } from "recoil";
import { IPostThumbnailCard } from "../components/molecules/cards/PostThumbnailCard";
import { StudyDateStatus } from "../types/studyTypes/studySubTypes";
import { IParticipation } from "../types/studyTypes/studyVoteTypes";

export const studyDateStatusState = atom<StudyDateStatus>({
  key: "StudyDateStatus",
  default: "today",
});

export const myStudyState = atom<IParticipation | null>({
  key: "MyStudy",
  default: undefined,
});

export const sortedStudyCardListState = atom<IPostThumbnailCard[]>({
  key: "SortedStudyCardList",
  default: undefined,
});
