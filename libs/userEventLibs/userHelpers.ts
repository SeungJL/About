import { ISortedUserAttends, IUserRankings } from "../../types2/page/ranking";
import { IScore } from "../../types2/pointSystem";
import { IVoteRate } from "../../types2/study/study";
import { IUser, UserBadge } from "../../types2/userTypes/userInfoTypes";

type DataArrMap = {
  score: IScore[];
  attend: IVoteRate[];
};

type SortUserScore = <T extends keyof DataArrMap>(
  scoreArr: IVoteRate[],
  uid: string,
  type: T
) => ISortedUserAttends[];

interface IUserBadge {
  badge: UserBadge;
  nextBadge: UserBadge;
}

// export const getUserBadge = (score: number, uid: string): IUserBadge => {
//   let badge: UserBadge;
//   let nextBadge: UserBadge;
//   if (EVENT_BADGE_딸기스무디.includes(uid)) badge = "딸기스무디";
//   if (EVENT_BADGE_라벤더.includes(uid)) badge = "라벤더";
//   if (EVENT_BADGE_민트초코.includes(uid)) badge = "민트초코";

//   const BADGE_INFO = Object.entries(BADGE_SCORE_MAPPINGS).map((item) => ({
//     minScore: item[1],
//     badge: item[0] as UserBadge,
//   }));

//   for (let i = 0; i < BADGE_INFO.length; i++) {
//     let item = BADGE_INFO[i];
//     if (score < item.minScore) {
//       badge = badge ?? BADGE_INFO[i - 1]?.badge;
//       nextBadge = item.badge;
//       break;
//     }
//     if (i === BADGE_INFO.length - 1) {
//       badge = badge ?? item.badge;
//       nextBadge = null;
//     }
//   }

//   return { badge, nextBadge };
// };

export const myScoreRank = (scoreArr: IScore[], myScore: number) => {
  let highCnt = 0;
  const total = scoreArr.length;
  scoreArr.forEach((user) => {
    if (user.score >= myScore) highCnt++;
  });
  const rate = (highCnt / total) * 100;
  if (rate < 1) return 1;
  if (rate < 5) return 5;
  if (rate < 10) return 10;
  else return Math.ceil(rate / 10) * 10;
};
// scoreArr: IScore[] | IUser[] | IRankingUser[],
// uid: string,
// type: "score" | "attend"

//순위 백분율 반환
const setPercentRankValue = (rankNum: number, total: number) => {
  const rate = (rankNum / total) * 100;
  if (rate < 1) return 1;
  if (rate < 5) return 5;
  if (rate < 10) return 10;
  else return Math.ceil(rate / 10) * 10;
};

// //유저 점수 랭킹 정렬
// export const sortUserScores = (
//   scoreArr: IScore[] | IUser[],
//   uid: string
// ): ISortedUserScores => {
//   let myScore = scoreArr.find((who) => who.uid === uid)?.score;

//   const compare = (a: IScore, b: IScore) => {
//     if (a.score > b.score) return -1;
//     else if (a.score < b.score) return 1;
//     return 0;
//   };
//   scoreArr.sort(compare);

//   const rankNum = myScore
//     ? scoreArr.findIndex((who) => who.score === myScore) + 1
//     : 0;

//   if (rankNum <= 100)
//     return {
//       scoreArr,
//       rankValue: rankNum,
//       isRankNum: true,
//     };
//   return {
//     scoreArr,
//     rankValue: setPercentRankValue(rankNum, scoreArr.length),
//     isRankNum: false,
//   };
// };
// //유저 월간 랭킹 정렬
// export const sortUserAttends = (
//   attendArr: IRankingUser[],
//   uid: string
// ): ISortedUserAttends => {
//   let myAttendCnt = attendArr.find((who) => who.uid === uid)?.cnt;

//   const compare = (a: IRankingUser, b: IRankingUser) => {
//     if (a.cnt > b.cnt) return -1;
//     else if (a.cnt < b.cnt) return 1;
//     return 0;
//   };
//   attendArr.sort(compare);

//   //정보가 없는 경우 rankNum은 0을 반환
//   const rankNum = myAttendCnt
//     ? attendArr.findIndex((who) => who.cnt === myAttendCnt) + 1
//     : 0;

//   if (rankNum <= 100)
//     return {
//       attendArr,
//       rankValue: rankNum,
//       isRankNum: true,
//     };
//   return {
//     attendArr,
//     rankValue: setPercentRankValue(rankNum, attendArr.length),
//     isRankNum: false,
//   };
// };

export const sortUserRanking = (
  users: IVoteRate[],
  uid: string
): IUserRankings => {
  let myValue = null;
  const compareRanking = (a: IVoteRate, b: IVoteRate) => {
    if (!myValue && (a.uid === uid || b.uid === uid)) {
      myValue = a.cnt;
    }
    if (a.cnt > b.cnt) return -1;
    else if (a.cnt < b.cnt) return 1;
    return 0;
  };

  const total = users.length;
  let myRankNum = 0;
  let percent;

  users.sort(compareRanking);

  if (myValue !== 0)
    users.forEach((user) => {
      if (user.cnt > myValue) myRankNum++;
    });

  return {
    users: users,
    mine: {
      rankNum: myValue === 0 ? -1 : myRankNum,
      isRank: true,
      value: myValue,
    },
  };

  const rate = (myRankNum / total) * 100;
  if (rate < 1) percent = 1;
  if (rate < 5) percent = 5;
  if (rate < 10) percent = 10;
  else percent = Math.ceil(rate / 10) * 10;
  return {
    users,
    mine: {
      percent: myValue === 0 ? 100 : percent,
      isRank: false,
      value: myValue,
    },
  };
};

export const sortUserScoreRanking = (
  users: IUser[],
  myScore: number
): IUserRankings => {
  const compareRanking = (a: IUser, b: IUser) => {
    if (a.score > b.score) return -1;
    else if (a.score < b.score) return 1;
    return 0;
  };

  const total = users.length;
  let myRankNum = 0;
  let percent;

  users.sort(compareRanking);

  if (myScore !== 0)
    users.forEach((user) => {
      if (user.score > myScore) myRankNum++;
    });

  return {
    users: users.map((user) => ({
      uid: user.uid,
      cnt: user.score,
      userSummary: user,
    })),
    mine: {
      rankNum: myScore === 0 ? -1 : myRankNum,
      isRank: true,
      value: myScore,
    },
  };
};
