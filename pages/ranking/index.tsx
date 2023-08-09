import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import { MainLoadingAbsolute } from "../../components/common/MainLoading";
import Header from "../../components/layout/Header";
import { sortUserScore } from "../../helpers/userHelpers";
import { useErrorToast } from "../../hooks/CustomToast";
import { useUserAttendRateAllQuery } from "../../hooks/user/studyStatistics/queries";
import dbConnect from "../../libs/backend/dbConnect";
import { User } from "../../models/user";
import RankingBar from "../../pagesComponents/ranking/RankingBar";
import RankingCategory from "../../pagesComponents/ranking/RankingCategory";
import RankingMembers from "../../pagesComponents/ranking/RankingMembers";
import RankingOverView from "../../pagesComponents/ranking/RankingOverview";
import {
  IRankingUser,
  RankingCategory as RankingCategoryType,
} from "../../types/page/ranking";
import { IUser } from "../../types/user/user";

export interface IMyRank {
  score: number;
  isRank: boolean;
  rankNum?: number;
  percent?: number;
}

interface IRanking {
  membersAll: IUser[];
}

function Ranking({ membersAll }: IRanking) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const errorToast = useErrorToast();

  const myUid = session?.uid;

  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [month, setMonth] = useState(dayjs().month());
  const [category, setCategory] = useState<RankingCategoryType>("월간");
  const [userScoreList, setUserScoreList] = useState<
    IUser[] | IRankingUser[]
  >();
  const [myRank, setMyRank] = useState<IMyRank>();
  const dayjsMonth = dayjs().month(month);

  const { data: monthScoreList, isLoading: attendLoading } =
    useUserAttendRateAllQuery(
      dayjsMonth.date(0),
      month === dayjs().month() ? dayjs() : dayjsMonth.endOf("month"),
      {
        onError: errorToast,
      }
    );

  useEffect(() => {
    if (!isLoading) setIsInitialLoading(false);
  }, [isLoading]);

  useEffect(() => {
    if (!userScoreList) return;
    const { rankNum, percent, isRank, score } = sortUserScore(
      userScoreList,
      session?.uid as string,
      category === "누적" ? "score" : "attend"
    );

    setMyRank({ rankNum, percent, isRank, score });

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, session?.uid, userScoreList]);

  useEffect(() => {
    if (myUid && !isGuest)
      setTimeout(() => {
        const element = document.getElementById(`ranking${myUid}`);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 800);
  }, [isGuest, myRank?.score, myUid]);

  return (
    <Layout>
      <Wrapper>
        <Header title="About 랭킹" url="/point" />
        <RankingOverView
          myRank={myRank}
          length={userScoreList?.length}
          isLoading={isLoading}
          isinitialLoading={isInitialLoading}
        />
        <RankingCategory
          initialUserScoreList={membersAll}
          initialMonthAttendArr={!attendLoading && monthScoreList}
          setUserScoreList={setUserScoreList}
          category={category}
          setCategory={setCategory}
          setIsLoading={setIsLoading}
          setMonth={setMonth}
        />
      </Wrapper>
      <RankingSection>
        <RankingBar isScore={category === "누적"} />
        <>
          {isLoading ? (
            <MainLoadingAbsolute />
          ) : (
            <RankingMembers
              memberList={userScoreList}
              type={category === "누적" ? "score" : "attend"}
            />
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
  const membersAll: IUser[] = JSON.parse(safeJsonStringify(filterUser));
  return { props: { membersAll } };
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
