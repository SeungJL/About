import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import { MainLoadingAbsolute } from "../../components/common/loaders/MainLoading";
import Header from "../../components/layout/Header";
import { getMonth } from "../../helpers/dateHelpers";
import { sortUserAttends, sortUserScores } from "../../helpers/userHelpers";
import { useErrorToast, useTypeErrorToast } from "../../hooks/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { useUserAttendRateAllQuery } from "../../hooks/user/studyStatistics/queries";
import dbConnect from "../../libs/backend/dbConnect";
import { User } from "../../models/user";
import RankingBar from "../../pagesComponents/ranking/RankingBar";
import RankingCategoryBar from "../../pagesComponents/ranking/RankingCategory";
import RankingMembers from "../../pagesComponents/ranking/RankingMembers";
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
  const typeErrorToast = useTypeErrorToast();

  const location = useRecoilValue(locationState);

  const [isLoading, setIsLoading] = useState(true);
  const [initialUsersData, setInitialUsersData] = useState<IRankingUser[]>();
  const [category, setCategory] = useState<RankingCategory>("월간");
  const [isLocationFilter, setIsLocationFilter] = useState(true);
  const [rankInfo, setRankInfo] = useState<RankingType>();

  const myUid = session?.uid;
  const currentMonth = getMonth();
  const month2 = category === "월간" ? currentMonth : currentMonth - 1;
  const dayjsMonth2 = dayjs().month(month2);
  const endDate =
    category === "월간"
      ? dayjs().add(1, "day")
      : dayjs().month(month2).endOf("month");

  const { data: userInfo } = useUserInfoQuery({
    enabled: !isGuest,
    onError: (e) => typeErrorToast(e, "user"),
  });

  //스터디 참여 기록
  const { data: attendAllData, isLoading: isAttendRateLoading } =
    useUserAttendRateAllQuery(dayjsMonth2.date(0), endDate, {
      enabled: category !== "누적",
      onError: errorToast,
    });

  //모든 유저 데이터와 attendAllData의 mixing
  useEffect(() => {
    if (isAttendRateLoading) return;
    const userAll =
      category === "누적"
        ? usersAll
        : attendAllData.map((who) => {
            const userInfo = usersAll.find((user) => user.uid === who.uid);
            return { ...userInfo, ...who };
          });
    setInitialUsersData(userAll);
  }, [
    attendAllData,
    category,
    initialUsersData,
    isAttendRateLoading,
    usersAll,
  ]);

  useEffect(() => {
    setIsLoading(true);
    setRankInfo(null);
    if (!initialUsersData || isAttendRateLoading) return;
    const filtered = isLocationFilter
      ? initialUsersData.filter((who) => who.location === location)
      : initialUsersData;

    const sortedData =
      category !== "누적"
        ? sortUserAttends(filtered, session?.uid as string)
        : sortUserScores(filtered, session?.uid as string);

    setRankInfo(sortedData);
    if (userInfo || isGuest) setIsLoading(false);
  }, [
    category,
    isLocationFilter,
    location,
    session?.uid,
    initialUsersData,
    userInfo,
    isAttendRateLoading,
    isGuest,
  ]);

  //본인 위치로 스크롤
  useEffect(() => {
    if (myUid && !isGuest) {
      setTimeout(() => {
        const element = document.getElementById(`ranking${myUid}`);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 800);
    }
  }, [isGuest, myUid, rankInfo]);

  return (
    <Layout>
      <Wrapper>
        <Header title="About 랭킹" url="/point" />
        <RankingOverview
          userInfo={userInfo}
          rankInfo={rankInfo}
          isLoading={isLoading}
          category={category}
        />
        <RankingCategoryBar
          category={category}
          setCategory={setCategory}
          isLocationFilter={isLocationFilter}
          setIsLocationFilter={setIsLocationFilter}
        />
      </Wrapper>
      <RankingSection>
        <RankingBar isScore={category === "누적"} />
        <>
          {!isLoading ? (
            <RankingMembers rankInfo={rankInfo} category={category} />
          ) : (
            <MainLoadingAbsolute />
          )}
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
