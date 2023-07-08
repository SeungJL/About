import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import {
  useScoreAllQuery,
  useScoreQuery,
} from "../../hooks/user/pointSystem/queries";
import { useUserLocationQuery } from "../../hooks/user/queries";
import { SortUserScore } from "../../libs/utils/userUtils";
import RankingCategory from "../../pagesComponents/ranking/RankingCategory";
import RankingMembers from "../../pagesComponents/ranking/RankingMembers";
import RankingOverview from "../../pagesComponents/ranking/RankingOverview";
import { isRankingLoadingState } from "../../recoil/loadingAtoms";
import { IScore } from "../../types/user/pointSystem";

export interface IMyRank {
  score: number;
  isRank: boolean;
  rankNum?: number;
  percent?: number;
}

function Ranking() {
  const { data: session } = useSession();

  const isGuest = session && session?.user.name === "guest";
  const myUid = session?.uid;

  const { data: location } = useUserLocationQuery();
  console.log(location);

  const [isFilter, setIsFilter] = useState(true);
  const [userArr, setUserArr] = useState<IScore[]>();

  const [isRankingLoading, setIsRankingLoading] = useRecoilState(
    isRankingLoadingState
  );
  const [userScoreList, setUserScoreList] = useState<IScore[]>([]);

  const [myRank, setMyRank] = useState<IMyRank>();
  const { data } = useScoreQuery({
    enabled: isGuest === false,
  });

  const myScore = data?.score | 0;

  useScoreAllQuery({
    enabled: true,
    onSuccess(data) {
      const { scoreArr, rankNum, percent, isRank } = SortUserScore(
        data,
        myScore
      );
      setUserArr(scoreArr);
      setUserScoreList(scoreArr);
      setMyRank({ rankNum, percent, isRank, score: myScore });
      setIsRankingLoading(false);
    },
  });
  useEffect(() => {
    if (myUid)
      setTimeout(() => {
        const element = document.getElementById(`ranking${myUid}`);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 800);
  }, [myUid]);

  useEffect(() => {
    if (isFilter) {
      const filterData = userArr?.filter((who) => who?.location === location);
      setUserScoreList(filterData);
    } else {
      setUserScoreList(userArr);
    }
  }, [isFilter, location, userArr]);

  return (
    <>
      <Header title="About 랭킹" url="/point" />
      <Layout>
        <RankingOverview myRank={myRank} length={userScoreList?.length} />
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
  padding: 12px 16px;
  border-radius: 8px;
  padding: 14px;
  height: calc(75vh - 46px);
  border: 5px solid var(--color-mint);
`;

export default Ranking;
