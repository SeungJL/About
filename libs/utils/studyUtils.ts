import { IParticipation } from "../../types/studyDetails";

export const arrangeSpace = (participations: IParticipation[]) => {
  const temp = [];

  participations.forEach((participant) => {
    const brand = participant.place.brand;
    if (brand === "탐앤탐스") temp[1] = participant;
    else if (brand === "커피빈") temp[0] = participant;
    else if (brand === "카탈로그") temp[3] = participant;
    else if (brand === "아티제") temp[2] = participant;
  });
  return temp;
};

export const arrangeMainSpace = (participations: IParticipation[]) => {
  const compare = (a: IParticipation, b: IParticipation) => {
    const cntA = a.attendences.length;
    const cntB = b.attendences.length;

    if (cntA > cntB) {
      return -1;
    }
    if (cntA < cntB) {
      return 1;
    }
    return 0;
  };

  return participations.sort(compare);
};
