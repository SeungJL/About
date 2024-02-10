import { atom } from "recoil";
import { IPostThumbnailCard } from "../components2/molecules/cards/PostThumbnailCard";
import { StudyDateStatus } from "../types2/studyTypes/studySubTypes";
import { IParticipation } from "../types2/studyTypes/studyVoteTypes";

export const studyDateStatusState = atom<StudyDateStatus>({
  key: "studyDateStatus",
  default: "today",
});

export const myStudyState = atom<IParticipation | null>({
  key: "MyStudy",
  default: undefined,
});

export const sortedStudyCardListState = atom<IPostThumbnailCard[]>({
  key: "sortedStudyCardList",
  default: undefined,
});
