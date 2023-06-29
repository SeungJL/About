import {
  ANYANG_숨맑은집,
  ANYANG_인뎃커피,
  ANYANG_커피인더스트리,
  ANYANG_파스쿠찌,
  SUWAN_아티제,
  SUWAN_이디야,
  SUWAN_카탈로그,
  SUWAN_칸나,
  SUWAN_커피빈,
  SUWAN_탐앤탐스,
  SUWAN_투썸,
  YANG_위카페,
  YANG_파스쿠찌,
  YANG_할리스,
  YANG_할리스2,
} from "../../storage/study";
import { IParticipation, IPlace } from "../../types/studyDetails";

export const arrangeSpace = (participations: IParticipation[] | IPlace[]) => {
  const temp = [];

  participations.forEach((participant) => {
    const ID =
      (participant as IParticipation)?.place?._id ||
      (participant as IPlace)?._id;
    //수원
    if (ID === SUWAN_탐앤탐스) temp[3] = participant;
    else if (ID === SUWAN_투썸) temp[4] = participant;
    else if (ID === SUWAN_카탈로그) temp[2] = participant;
    else if (ID === SUWAN_아티제) temp[0] = participant;
    else if (ID === SUWAN_커피빈) temp[1] = participant;
    else if (ID === SUWAN_칸나) temp[5] = participant;
    else if (ID === SUWAN_이디야) temp[6] = participant;
    //양천
    if (ID === YANG_위카페) temp[0] = participant;
    else if (ID === YANG_할리스2) temp[1] = participant;
    else if (ID === YANG_파스쿠찌) temp[2] = participant;
    else if (ID === YANG_할리스) temp[3] = participant;
    //안양
    if (ID === ANYANG_숨맑은집) temp[0] = participant;
    else if (ID === ANYANG_인뎃커피) temp[1] = participant;
    else if (ID === ANYANG_파스쿠찌) temp[2] = participant;
    else if (ID === ANYANG_커피인더스트리) temp[3] = participant;
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
