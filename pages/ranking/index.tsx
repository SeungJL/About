import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { useErrorToast } from "../../hooks/ui/CustomToast";
import {
  useScoreAllQuery,
  useScoreQuery,
} from "../../hooks/user/pointSystem/queries";
import { useUserLocationQuery } from "../../hooks/user/queries";
import { SortUserScore } from "../../libs/utils/userUtils";
import RankingCategory from "../../pagesComponents/ranking/RankingCategory";
import RankingMembers from "../../pagesComponents/ranking/RankingMembers";
import RankingOverView from "../../pagesComponents/ranking/RankingOverview";
import { isRankingLoadingState } from "../../recoil/loadingAtoms";
import { IScore } from "../../types/user/pointSystem";

export interface IMyRank {
  score: number;
  isRank: boolean;
  rankNum?: number;
  percent?: number;
}

function Ranking() {
  const errorToast = useErrorToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const myUid = session?.uid;

  const setIsRankingLoading = useSetRecoilState(isRankingLoadingState);

  const [isFilter, setIsFilter] = useState(true);
  const [userScoreList, setUserScoreList] = useState<IScore[]>([]);
  const [myRank, setMyRank] = useState<IMyRank>();

  const { data: location } = useUserLocationQuery();
  const { data } = useScoreQuery({
    enabled: isGuest === false,
  });

  const myScore = data?.score | 0;

  const { data: userScoreAll, isLoading } = useScoreAllQuery({
    onError: errorToast,
  });

  useEffect(() => {
    if (isLoading) return;
    let temp = userScoreAll;
    if (isFilter) temp = [...temp].filter((who) => who.location === location);
    setUserScoreList(temp);
    const { rankNum, percent, isRank } = SortUserScore(temp, myScore);
    setMyRank({ rankNum, percent, isRank, score: myScore });
    setIsRankingLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilter, isLoading, location, myScore, userScoreAll]);

  useEffect(() => {
    if (myUid)
      setTimeout(() => {
        const element = document.getElementById(`ranking${myUid}`);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 800);
  }, [myUid]);

  return (
    <>
      <Header title="About 랭킹" url="/point" />
      <Layout>
        <RankingOverView myRank={myRank} length={userScoreList?.length} />
        <RankingSection>
          <RankingCategory isFilter={isFilter} setIsFilter={setIsFilter} />
          <RankingMembers memberList={userScoreList} />
        </RankingSection>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  height: 100vh;
`;

const RankingSection = styled.div`
  background-color: white;
  height: 100%;
  overflow-y: scroll;
  padding: var(--padding-main) var(--padding-sub);
  border-radius: var(--border-radius-main);
  height: calc(75vh - 46px);
  border: 5px solid var(--color-mint);
`;

export default Ranking;
