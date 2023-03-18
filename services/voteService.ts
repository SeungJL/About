import dayjs, { Dayjs } from "dayjs";
import {
  MIN_USER_FOR_STUDY,
  MAX_USER_PER_PLACE,
  VOTE_END_HOUR,
  VOTE_START_HOUR,
} from "../constants/system";
import { dateToDayjs, getToday, now, strToDate } from "../libs/utils/dateUtils";
import { Attendence } from "../models/attendence";

import { IParticipation, Vote } from "../models/vote";

export const findOneVote = (date: Date) =>
  Vote.findOne({ date }).populate([
    "participations.place",
    "participations.attendences.user",
    "participations.absences.user",
  ]);

//투표 결과가 나온 이후에는 최종적으로 선택된 장소를 firstChoice true로 하고, 나머지는 false로 함.

export const confirm = async (dateStr: string) => {
  const date = strToDate(dateStr).toDate();
  const vote = await Vote.findOne({ date });
  const failure = new Set();

  const attendedUsersArr = [0, 0, 0, 0];

  if (vote.participations.some((p) => p.status === "pending")) {
    //1지망으로 투표한 사람들만 가지고 모든 장소에 한번 알고리즘을 돌림

    vote?.participations?.map((participation, index) => {
      let invalidAttendCnt = 0;

      participation.attendences.map((attendance) => {
        // 한 장소에 대한 1지망 알고리즘

        if (attendance.firstChoice) {
          const myStart = dayjs(attendance.time.start);
          const myEnd = dayjs(attendance.time.end);
          let overlapCnt = 0;
          participation.attendences.map((attendance) => {
            let isOverlap = false;
            if (attendance.firstChoice) {
              //해당 장소에 투표한 다른 1지망 사람과 시간 비교
              const otherStart = dayjs(attendance.time.start);
              const otherEnd = dayjs(attendance.time.end);

              if (myStart <= otherStart && myEnd >= otherStart.add(1, "hour")) {
                //내 스터디 시간이 다른 사람 시작시간 보다 빠른 경우, 내 스터디 종료 시간이 다른 사람 시작시간보다 1시간 이상 늦어야 겹친다고 판단
                isOverlap = true;
              } else if (
                //내 스터디 시간보다 다른 사람 시작시간이 빠른 경우, 다른 사람 종료 시간이 내 시작시간보다 1시간 이상 늦어야 겹친다고 판단
                myStart > otherStart &&
                otherEnd >= myStart.subtract(1, "hour")
              )
                isOverlap = true;

              if (isOverlap) {
                //다른 사람이 나랑 시간이 겹친 경우
                overlapCnt++;
              }
            }
          });
          //겹치는 사람이 3명 이상(본인을 포함하여)인 경우 유효 카운트 +1

          if (overlapCnt >= 3) {
            //이 경우 무조건 스터디가 열리는 조건이지만, failure에 넣을 인원들 고려를 위해 invalidAttendCnt에서 처리
            invalidAttendCnt++;
          } else if (overlapCnt === 1) {
            failure.add(attendance.user); //1지망으로 투표를 했지만 시간매칭 실패한 사람
            attendance.firstChoice = false; // 1지망 false로 변경(결과가 나온뒤니까)
          }
        }
      });

      if (invalidAttendCnt >= 3) {
        attendedUsersArr[index] = invalidAttendCnt; // 스터디 참여 확정 인원 숫자. 나중에 인원 분배 최적화 알고리즘 구현을 위해
        participation.status = "open";
      } else {
        participation.attendences.map((att) => {
          att.firstChoice = false;
          failure.add(att.user);
        });
        //1지망 false로 변경. 전원 매칭 실패로 failure에 추가
        participation.status = "dismissed";
      }
    });
    vote?.save();
  }
  //open된 장소에 본인이 2지망으로 투표한 경우 추가해주는 알고리즘
  //해당 시점에 모든 장소는 open또는 dismissed 일 것임
  vote?.participations?.map((participation) => {
    if (participation.status === "open") {
      participation.attendences.map((attendance) => {
        // 해당 attendences는 투표했던 모든 인원일 것임
        if (failure.has(attendance.user)) {
          // 아직 장소가 확정나지 않은 인원들
          const myStart = attendance.time.start;
          const myEnd = attendance.time.end;
          let overlapCnt = 0; //시간이 겹치는 유효 인원
          participation.attendences.map((attendance) => {
            let isOverlap = false;
            if (attendance.firstChoice) {
              //참여 확정 인원과 비교
              const otherStart = attendance.time.start;
              const otherEnd = attendance.time.end;
              if (myStart <= otherStart && myEnd >= otherStart.add(1, "hour"))
                isOverlap = true;
              else if (
                myStart > otherStart &&
                otherEnd >= myStart.add(1, "hour")
              )
                isOverlap = true;
              if (isOverlap) overlapCnt++;
            }
          });
          if (overlapCnt >= 2) {
            // 확정 인원 중에 1시간이라도 겹치는 사람이 있는 경우
            attendance.firstChoice = true; // 확정 장소를 이 곳으로 변경
            failure.delete(attendance.user);
          }
        }
      });
    }
  });
  vote?.save();
  //1지망 투표도 실패하고, 참여 확정된 1지망으로의 2지망 변경도 실패한 경우(예를 들어 그 날 1지망만으로 스터디가 열린곳이 없으면 모두 failure에 들어가 있을 것임)
  vote?.participations?.map((participation) => {
    let invalidAttendCnt = 0;
    if (participation.status === "dismissed") {
      participation.attendences.map((attendance) => {
        if (failure.has(attendance.user)) {
          const myStart = dayjs(attendance.time.start);
          const myEnd = dayjs(attendance.time.end);
          let overlapCnt = 0;
          participation.attendences.map((attendance) => {
            let isOverlap = false;
            if (failure.has(attendance.user)) {
              const otherStart = dayjs(attendance.time.start);
              const otherEnd = dayjs(attendance.time.end);
              if (myStart <= otherStart && myEnd >= otherStart.add(1, "hour"))
                isOverlap = true;
              else if (
                myStart > otherStart &&
                otherEnd >= myStart.add(1, "hour")
              )
                isOverlap = true;

              if (isOverlap) overlapCnt++;
            }
          });

          if (overlapCnt >= 3) {
            //open 확정이지만 failure 인원 체크를 위해 invalidAttendCnt에서 처리
            invalidAttendCnt++;
            attendance.firstChoice = true;
            failure.delete(attendance.user);
          } else if (overlapCnt === 2) {
            attendance.firstChoice = true;
            failure.delete(attendance.user);
            //open이 된다면 합류 될 것이기 때문에 임시로 true 부여. dismissed라면 이후 다시 false로 변경
          }
        }
      });
    }
    if (invalidAttendCnt >= 3) {
      participation.status = "open";
    } else {
      participation.attendences.map((att) => {
        att.firstChoice = false;
        failure.add(att.user);
      });
    }
  });

  vote?.save();
};
