import dayjs from "dayjs";
import { useState } from "react";
import { useAdminUsersControlQuery } from "../../hooks/admin/quries";
import { RankingCategory } from "../../types/models/ranking";
import { getMonth } from "../../utils/dateTimeUtils";

interface IStatisticsRanking {}
export default function StatisticsRanking({}: IStatisticsRanking) {
  const [category, setCategory] = useState<RankingCategory>("월간");

  const currentMonth = getMonth();
  const month2 = category === "월간" ? currentMonth : currentMonth - 1;
  const dayjsMonth2 = dayjs().month(month2);
  const endDate =
    category === "월간" ? dayjs() : dayjs().month(month2).endOf("month");

  const { data: usersAll, isLoading: isAdminUsersLoading } =
    useAdminUsersControlQuery();
  return null;
}

//모든 유저 데이터와 attendAllData의 mixing
// useEffect(() => {
//   if (isAttendRateLoading || isAdminUsersLoading) return;
//   const filteredUsers = usersAll?.filter(
//     (who) => who?.isActive && who?.name !== "guest"
//   );
//   const userAll =
//     category === "누적"
//       ? filteredUsers
//       : attendAllData?.map((who) => {
//           const userInfo = filteredUsers.find((user) => user.uid === who.uid);
//           return { ...userInfo, ...who };
//         });
//   setInitialUsersData(userAll);
// }, [
//   attendAllData,
//   category,
//   isAdminUsersLoading,
//   isAttendRateLoading,
//   usersAll,
// ]);

// useEffect(() => {
//   setIsLoading(true);
//   setRankInfo(null);
//   if (!initialUsersData || isAttendRateLoading) return;
//   const filtered = isLocationFilter
//     ? initialUsersData.filter((who) => who.location === location)
//     : initialUsersData;

//   const sortedData =
//     category !== "누적"
//       ? sortUserAttends(filtered, session?.user?.uid as string)
//       : sortUserScores(filtered, session?.user?.uid as string);

//   setRankInfo(sortedData);
//   if (userInfo || isGuest) setIsLoading(false);
// }, [
//   category,
//   isLocationFilter,
//   location,
//   session?.user?.uid,
//   initialUsersData,
//   userInfo,
//   isAttendRateLoading,
//   isGuest,
// ]);

// //본인 위치로 스크롤
// const uid = session?.user.uid;
// useEffect(() => {
//   if (uid && !isGuest) {
//     setTimeout(() => {
//       const element = document.getElementById(`ranking${uid}`);
//       element?.scrollIntoView({ behavior: "smooth" });
//     }, 500);
//   }
// }, [isGuest, uid, rankInfo]);

// return (
//   <div className="">
//     <RankingCategoryBar
//       category={category}
//       setCategory={setCategory}
//       isLocationFilter={isLocationFilter}
//       setIsLocationFilter={setIsLocationFilter}
//     />
//     <RankingSection>
//       <RankingBar isScore={category === "누적"} />
//       <>
//         {!isLoading ? (
//           <RankingMembers rankInfo={rankInfo} category={category} />
//         ) : (
//           <MainLoadingAbsolute />
//         )}
//       </>
//     </RankingSection>
//   </div>
//   );
// }
// const RankingSection = styled.div`
//   position: relative;
//   overflow-y: scroll;
//   background-color: white;
//   padding: var(--gap-4) var(--gap-3);
//   border-radius: var(--rounded-lg);
//   height: 65vh;
//   border: 4px solid var(--color-mint);
// `;
