import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { MainLoadingAbsolute } from "../../components/common/loaders/MainLoading";
import Header from "../../components/layout/Header";
import { getMonth } from "../../helpers/dateHelpers";
import { sortUserAttends, sortUserScores } from "../../helpers/userHelpers";
import { useAdminUsersControlQuery } from "../../hooks/admin/quries";
import {
  useErrorToast,
  useTypeErrorToast,
} from "../../hooks/custom/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { useUserAttendRateQuery } from "../../hooks/user/sub/studyRecord/queries";
import RankingBar from "../../pageTemplates/ranking/RankingBar";
import RankingCategoryBar from "../../pageTemplates/ranking/RankingCategory";
import RankingMembers from "../../pageTemplates/ranking/RankingMembers";
import RankingOverview from "../../pageTemplates/ranking/RankingOverview";
import { locationState } from "../../recoil/userAtoms";
import {
  IRankingUser,
  RankingCategory,
  RankingType,
} from "../../types/page/ranking";

function Ranking() {
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

  const myUid = session?.user?.uid;
  const currentMonth = getMonth();
  const month2 = category === "월간" ? currentMonth : currentMonth - 1;
  const dayjsMonth2 = dayjs().month(month2);
  const endDate =
    category === "월간" ? dayjs() : dayjs().month(month2).endOf("month");

  const { data: userInfo } = useUserInfoQuery({
    enabled: !isGuest,
    onError: (e) => typeErrorToast(e, "user"),
  });

  const { data: usersAll, isLoading: isAdminUsersLoading } =
    useAdminUsersControlQuery();

  //스터디 참여 기록
  const { data: attendAllData, isLoading: isAttendRateLoading } =
    useUserAttendRateQuery(dayjsMonth2.date(0), endDate, false, {
      enabled: category !== "누적",
      onError: errorToast,
    });

  //모든 유저 데이터와 attendAllData의 mixing
  useEffect(() => {
    if (isAttendRateLoading || isAdminUsersLoading) return;
    const filteredUsers = usersAll?.filter(
      (who) => who?.isActive && who?.name !== "guest"
    );
    const userAll =
      category === "누적"
        ? filteredUsers
        : attendAllData?.map((who) => {
            const userInfo = filteredUsers.find((user) => user.uid === who.uid);
            return { ...userInfo, ...who };
          });
    setInitialUsersData(userAll);
  }, [
    attendAllData,
    category,
    isAdminUsersLoading,
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
        ? sortUserAttends(filtered, session?.user?.uid as string)
        : sortUserScores(filtered, session?.user?.uid as string);

    setRankInfo(sortedData);
    if (userInfo || isGuest) setIsLoading(false);
  }, [
    category,
    isLocationFilter,
    location,
    session?.user?.uid,
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
      }, 500);
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

const Layout = styled.div`
  height: 100vh;
`;

const Wrapper = styled.div`
  background-color: var(--gray-7);
  height: 35vh;
`;

const RankingSection = styled.div`
  position: relative;
  overflow-y: scroll;
  background-color: white;
  padding: var(--gap-4) var(--gap-3);
  border-radius: var(--rounded-lg);
  height: 65vh;
  border: 4px solid var(--color-mint);
`;

export default Ranking;
