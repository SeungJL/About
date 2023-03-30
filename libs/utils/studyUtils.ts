import { IParticipation } from "../../types/studyDetails";

export const arrangeSpace = (participations: IParticipation[]) => {
  const temp = [];
  console.log(participations);
  participations.forEach((participant) => {
    const brand = participant.place.brand;
    if (brand === "탐앤탐스") temp[1] = participant;
    else if (brand === "커피빈") temp[0] = participant;
    else if (brand === "카탈로그") temp[3] = participant;
    else if (brand === "아티제") temp[2] = participant;
  });
  return temp;
};
