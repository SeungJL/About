import {
  SUWAN_아티제,
  SUWAN_카탈로그,
  SUWAN_커피빈,
  SUWAN_탐앤탐스,
  SUWAN_투썸,
  SUWAN_할리스,
  YANG_스타벅스,
  YANG_위카페,
  YANG_파스쿠찌,
  YANG_할리스,
} from "../../constants/study";
import { IParticipation } from "../../types/studyDetails";
import { Location } from "../../types/system";

export const arrangeSpace = (participations: IParticipation[]) => {
  const temp = [];
  participations.forEach((participant) => {
    const ID = participant.place._id;
    //수원
    if (ID === SUWAN_탐앤탐스) temp[3] = participant;
    else if (ID === SUWAN_투썸) temp[4] = participant;
    else if (ID === SUWAN_카탈로그) temp[2] = participant;
    else if (ID === SUWAN_아티제) temp[0] = participant;
    else if (ID === SUWAN_커피빈) temp[1] = participant;
    else if (ID === SUWAN_할리스) temp[5] = participant;
    //양천
    if (ID === YANG_위카페) temp[0] = participant;
    else if (ID === YANG_스타벅스) temp[1] = participant;
    else if (ID === YANG_파스쿠찌) temp[2] = participant;
    else if (ID === YANG_할리스) temp[3] = participant;
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
