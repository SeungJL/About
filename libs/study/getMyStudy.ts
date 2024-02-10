import { IParticipation } from "../../types2/studyTypes/studyVoteTypes";

export const getMyStudy = (
  participations: IParticipation[],
  myUid: string
): IParticipation | null => {
  let myStudy: IParticipation | null = null;
  participations.forEach((par) =>
    par.attendences.forEach((who) => {
      if (who.user.uid === myUid) {
        myStudy = par;
      }
    })
  );
  return myStudy;
};
