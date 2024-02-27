import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import Slide from "../../components/layout/PageSlide";
import { sortUserRanking } from "../../helpers/userHelpers";
import { useTypeToast } from "../../hooks/custom/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { useUserAttendRateQuery } from "../../hooks/user/sub/studyRecord/queries";
import RankingMembers from "../../pageTemplates/ranking/RankingMembers";
import RankingOverview from "../../pageTemplates/ranking/RankingOverview";
import StatisticsMine from "../../pageTemplates/ranking/StatisticsMine";
import StatisticsTabNav from "../../pageTemplates/ranking/StatisticsTabNav";
import { IUserRankings } from "../../types/page/ranking";
import { LocationEn } from "../../types2/serviceTypes/locationTypes";
import { convertLocationLangTo } from "../../utils/convertUtils/convertDatas";

function Ranking() {
  const typeToast = useTypeToast();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const location = convertLocationLangTo(
    searchParams.get("location") as LocationEn,
    "kr"
  );
  const isGuest = session?.user.name === "guest";

  const [usersRanking, setUsersRanking] = useState<IUserRankings>();
  const [tabValue, setTabValue] = useState<"전체 랭킹" | "내 통계">(
    "전체 랭킹"
  );

  const { data: userInfo } = useUserInfoQuery({
    enabled: !isGuest,
  });

  const { data: attendRecords } = useUserAttendRateQuery(
    dayjs().subtract(1, "month").date(0),
    dayjs(),
    false,
    true,
    "수원",
    {
      onError: () => typeToast("error"),
    }
  );

  useEffect(() => {
    if (!attendRecords) return;
    setUsersRanking(
      sortUserRanking(attendRecords, session?.user.uid, "attend")
    );
  }, [attendRecords]);


  return (
    <>
      <Header title="About 랭킹" />
      <Slide>
        <Layout>
          {usersRanking && (
            <>
              <RankingOverview
                myRankInfo={usersRanking.mine}
                totalCnt={usersRanking.users.length}
              />
              <StatisticsTabNav setTabValue={setTabValue} />
              {tabValue === "전체 랭킹" ? (
                <RankingMembers rankingUsers={usersRanking.users} />
              ) : (
                <StatisticsMine />
              )}
            </>
          )}
        </Layout>
      </Slide>
    </>
  );
}

const Layout = styled.div`
  height: calc(100vh - 96px);
  overflow-y: auto;
  background-color: var(--gray-7);
  display: flex;
  flex-direction: column;
`;

export default Ranking;
