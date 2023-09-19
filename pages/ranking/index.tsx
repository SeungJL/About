import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import { getMonth } from "../../helpers/dateHelpers";
import { sortUserAttends } from "../../helpers/userHelpers";
import { useErrorToast } from "../../hooks/CustomToast";
import { useUserAttendRateAllQuery } from "../../hooks/user/studyStatistics/queries";
import dbConnect from "../../libs/backend/dbConnect";
import { User } from "../../models/user";
import RankingBar from "../../pagesComponents/ranking/RankingBar";
import RankingOverview from "../../pagesComponents/ranking/RankingOverview";
import { locationState } from "../../recoil/userAtoms";
import {
  IRankingUser,
  RankingCategory,
  RankingType,
} from "../../types/page/ranking";
import { IUser, IUsersAll } from "../../types/user/user";

function Ranking({ usersAll }: IUsersAll) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const errorToast = useErrorToast();

  const myUid = session?.uid;

  // const [isInitialLoading, setIsInitialLoading] = useState(true);
  // const [month, setMonth] = useState(dayjs().month());
  const [isLocationFilter, setIsLocationFilter] = useState(true);
  const [category, setCategory] = useState<RankingCategory>("월간");
  const [usersAllData, setUsersAllData] = useState<IRankingUser[]>();
  const [rankInfo, setRankInfo] = useState<RankingType>();
  const [isLoading, setIsLoading] = useState(true);

  const location = useRecoilValue(locationState);

  // const dayjsMonth = dayjs().month(month);

  const currentMonth = getMonth();
  const month2 = category === "월간" ? currentMonth : currentMonth - 1;
  const dayjsMonth2 = dayjs().month(month2);
  const endDate =
    category === "월간"
      ? dayjs().add(1, "day")
      : dayjs().month(month2).endOf("month");

  const { data: attendAllData, isLoading: isAttendRateLoading } =
    useUserAttendRateAllQuery(dayjsMonth2.date(0), endDate, {
      enabled: category !== "누적",
      onError: errorToast,
    });

  //모든 유저 데이터와 attendAllData의 mixing
  useEffect(() => {
    if (isAttendRateLoading) return;
    const userAll = attendAllData.map((who) => {
      const userInfo = usersAll.find((user) => user.uid === who.uid);
      return { ...userInfo, ...who };
    });

    setUsersAllData(userAll);
  }, [attendAllData, isAttendRateLoading, usersAll]);

  useEffect(() => {
    if (!usersAllData) return;

    const filtered = isLocationFilter
      ? usersAllData.filter((who) => who.location === location)
      : usersAllData;

    if (category !== "누적") {
      const sortedData = sortUserAttends(filtered, session?.uid as string);
      setRankInfo(sortedData);
    }
    setIsLoading(false);
  }, [category, isLocationFilter, location, session?.uid, usersAllData]);

  // useEffect(() => {
  //   if (isLocationFilter) attendAllData.filter((who) => who);
  // }, []);

  // useEffect(() => {
  //   if (!userScoreList) return;

  //   setMyRank({ rankNum, percent, isRank, score });

  //   setIsLoading(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category, session?.uid, userScoreList]);

  // useEffect(() => {
  //   if (myUid && !isGuest)
  //     setTimeout(() => {
  //       const element = document.getElementById(`ranking${myUid}`);
  //       element?.scrollIntoView({ behavior: "smooth" });
  //     }, 800);
  // }, [isGuest, myRank?.score, myUid]);

  return (
    <Layout>
      <Wrapper>
        <Header title="About 랭킹" url="/point" />
        <RankingOverview rankInfo={rankInfo} isLoading={isLoading} category={category}/>
        {/* <RankingCategory
          initialUserScoreList={usersAll}
          initialMonthAttendArr={!attendLoading && monthScoreList}
          setUserScoreList={setUserScoreList}
          category={category}
          setCategory={setCategory}
          setIsLoading={setIsLoading}
          setMonth={setMonth}
        /> */}
      </Wrapper>
      <RankingSection>
        <RankingBar isScore={category === "누적"} />
        <>
          {/* {isLoading ? (
            <MainLoadingAbsolute />
          ) : (
            <RankingMembers
              memberList={userScoreList}
              type={category === "누적" ? "score" : "attend"}
            />
          )} */}
        </>
      </RankingSection>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const user = await User.find();
  const filterUser = user?.filter(
    (who) => who?.isActive && who?.name !== "guest"
  );
  const usersAll: IUser[] = JSON.parse(safeJsonStringify(filterUser));
  return { props: { usersAll } };
};

const Layout = styled.div`
  height: 100vh;
`;

const Wrapper = styled.div`
  background-color: var(--font-h7);
  height: 35vh;
`;

const RankingSection = styled.div`
  position: relative;
  overflow-y: scroll;
  background-color: white;
  padding: var(--padding-main) var(--padding-sub);
  border-radius: var(--border-radius-main);
  height: 65vh;
  border: 4px solid var(--color-mint);
`;

export default Ranking;
