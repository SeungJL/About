import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Slide from "../../components/layout/PageSlide";
import Header from "../../components2/Header";
import { sortUserAttends, sortUserScores } from "../../helpers/userHelpers";
import { useTypeToast } from "../../hooks/custom/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { useUserAttendRateQuery } from "../../hooks/user/sub/studyRecord/queries";
import StatisticsTabNav from "../../pageTemplates/ranking/StatisticsTabNav";
import { IRankingUser, RankingType } from "../../types/page/ranking";
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

  const [isLoading, setIsLoading] = useState(true);
  const [initialUsersData, setInitialUsersData] = useState<IRankingUser[]>();

  const [isLocationFilter, setIsLocationFilter] = useState(true);
  const [rankInfo, setRankInfo] = useState<RankingType>();

  const { data: userInfo } = useUserInfoQuery({
    enabled: !isGuest,
  });

  const { data: attendRecords } = useUserAttendRateQuery(
    dayjs().subtract(1, "month").date(0),
    dayjs(),
    false,
    {
      onError: () => typeToast("error"),
    }
  );

  useEffect(() => {
    if (!attendRecords) return;
    console.log(attendRecords);
    return;
    const filtered = isLocationFilter
      ? initialUsersData.filter((who) => who.location === location)
      : initialUsersData;
    const A = sortUserAttends(filtered, session?.user?.uid as string);
    const B = sortUserScores(filtered, session?.user?.uid as string);
    console.log(A, B);
  }, [attendRecords]);

  return (
    <>
      <Slide isFixed={true}>
        <Header title="About 랭킹" />
      </Slide>
      <Layout>
        <Wrapper>
          {/* <RankingOverview
            userInfo={userInfo}
            rankInfo={rankInfo}
            isLoading={isLoading}
          /> */}
          <StatisticsTabNav />
        </Wrapper>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  height: 100vh;
`;

const Wrapper = styled.div`
  background-color: var(--gray-7);
`;

export default Ranking;
