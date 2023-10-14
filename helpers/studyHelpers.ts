import dayjs, { Dayjs } from "dayjs";
import {
  STUDY_VOTE_END_HOUR,
  STUDY_VOTE_START_HOUR,
} from "../constants/settingValue/study";
import {
  ANYANG_숨맑은집,
  ANYANG_인뎃커피,
  ANYANG_자유신청,
  ANYANG_커피인더스트리,
  ANYANG_파스쿠찌,
  GANGNAM_강남,
  GANGNAM_강남구청,
  GANGNAM_교대,
  GANGNAM_논현,
  GANGNAM_선릉,
  GANGNAM_신논현,
  GANGNAM_양재,
  GANGNAM_자유신청,
  SUWAN_이디야,
  SUWAN_자유신청,
  SUWAN_카탈로그,
  SUWAN_칸나,
  SUWAN_커피빈,
  SUWAN_탐앤탐스,
  SUWAN_탐앤탐스2,
  SUWAN_투썸,
  SUWAN_투썸상현,
  YANG_몽글,
  YANG_스타벅스,
  YANG_위카페,
  YANG_이디야,
  YANG_자유신청,
  YANG_카페꼼마,
  YANG_카페베네,
  YANG_파스쿠찌,
  YANG_할리스,
} from "../storage/study";
import { IParticipation, IPlace, StudyDate } from "../types/study/studyDetail";
import { getToday, now } from "./dateHelpers";

export const arrangeSpace = (participations: IParticipation[] | IPlace[]) => {
  const temp = [];

  participations.forEach((participant) => {
    const ID =
      (participant as IParticipation)?.place?._id ||
      (participant as IPlace)?._id;
    //수원
    if (ID === SUWAN_탐앤탐스) temp[0] = participant;
    else if (ID === SUWAN_투썸) temp[2] = participant;
    else if (ID === SUWAN_카탈로그) temp[3] = participant;
    else if (ID === SUWAN_투썸상현) temp[7] = participant;
    else if (ID === SUWAN_커피빈) temp[5] = participant;
    else if (ID === SUWAN_칸나) temp[1] = participant;
    else if (ID === SUWAN_이디야) temp[6] = participant;
    else if (ID === SUWAN_탐앤탐스2) temp[4] = participant;
    else if (ID === SUWAN_자유신청) temp[8] = participant;

    //양천
    if (ID === YANG_위카페) temp[0] = participant;
    else if (ID === YANG_이디야) temp[5] = participant;
    else if (ID === YANG_파스쿠찌) temp[6] = participant;
    else if (ID === YANG_할리스) temp[3] = participant;
    else if (ID === YANG_카페베네) temp[1] = participant;
    else if (ID === YANG_스타벅스) temp[4] = participant;
    else if (ID === YANG_카페꼼마) temp[2] = participant;
    else if (ID === YANG_몽글) temp[7] = participant;
    else if (ID === YANG_자유신청) temp[8] = participant;
    //안양
    if (ID === ANYANG_숨맑은집) temp[0] = participant;
    else if (ID === ANYANG_인뎃커피) temp[1] = participant;
    else if (ID === ANYANG_파스쿠찌) temp[2] = participant;
    else if (ID === ANYANG_커피인더스트리) temp[3] = participant;
    else if (ID === SUWAN_탐앤탐스) temp[4] = participant;
    else if (ID === ANYANG_자유신청) temp[5] = participant;
    //
    if (ID === GANGNAM_강남) temp[0] = participant;
    if (ID === GANGNAM_강남구청) temp[4] = participant;
    if (ID === GANGNAM_논현) temp[1] = participant;
    if (ID === GANGNAM_신논현) temp[5] = participant;
    if (ID === GANGNAM_교대) temp[6] = participant;
    if (ID === GANGNAM_선릉) temp[3] = participant;
    if (ID === GANGNAM_양재) temp[2] = participant;
    if (ID === GANGNAM_자유신청) temp[8] = participant;
  });

  return temp;
};

export const arrangeMainSpace = (
  participations: IParticipation[],
  isPassed?: boolean
) => {
  const compare = (a: IParticipation, b: IParticipation) => {
    const cntA = !isPassed
      ? a.attendences.length
      : a.attendences.filter((who) => who.firstChoice).length;
    const cntB = !isPassed
      ? b.attendences.length
      : b.attendences.filter((who) => who.firstChoice).length;

    if (cntA > cntB) return -1;
    if (cntA < cntB) return 1;
    return 0;
  };

  return participations.sort(compare);
};

export const getInterestingDate = () => {
  const today = getToday();
  const current = now();
  if (current < today.hour(STUDY_VOTE_START_HOUR)) return today;
  return today.add(1, "day");
};

type GetStudyDate = (voteDate: Dayjs) => StudyDate;

export const getStudyDate: GetStudyDate = (voteDate) => {
  const currentDate = dayjs().startOf("day");
  const currentHours = dayjs().hour();

  if (currentDate.isSame(voteDate))
    return currentHours < STUDY_VOTE_END_HOUR ? "today" : "passed";
  if (voteDate.isBefore(currentDate)) return "passed";

  if (
    voteDate.isSame(currentDate.add(1, "day")) &&
    currentHours >= STUDY_VOTE_END_HOUR
  )
    return "today";
  return "not passed";
};
