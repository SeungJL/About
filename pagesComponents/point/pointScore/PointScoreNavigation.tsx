import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { sortUserScores } from "../../../helpers/userHelpers";
import { useScoreAllQuery } from "../../../hooks/user/pointSystem/queries";
import { useUserLocationQuery } from "../../../hooks/user/queries";
import { isPointLoadingState } from "../../../recoil/loadingAtoms";
import { ISortedUserScores } from "../../../types/page/ranking";

interface IPointScoreNavigation {
  myScore: number;
}

function PointScoreNavigation({ myScore }: IPointScoreNavigation) {
  const router = useRouter();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const setIsPointLoading = useSetRecoilState(isPointLoadingState);

  const [rankInfo, setRankInfo] = useState<ISortedUserScores>();

  const { data: location } = useUserLocationQuery({
    enabled: !isGuest,
  });

  useScoreAllQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const locationData = data.filter((who) => who.location === location);
      const sortedData = sortUserScores(locationData, session?.uid as string);
      setRankInfo(sortedData);
      setIsPointLoading(false);
    },
  });

  const rankValueText =
    isGuest ||
    (rankInfo &&
      (rankInfo.rankValue === -1
        ? "NEW"
        : rankInfo.isRankNum
        ? `지역 ${rankInfo.rankValue}위`
        : `상위 ${rankInfo.rankValue}%`));

  return (
    <>
      <Layout>
        <Button onClick={() => router.push("/point/scoreLog")}>
          <div>About 점수</div>
          <div>
            <span>{myScore || 0}점</span>
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </div>
        </Button>
        <Button onClick={() => router.push("/ranking")}>
          <div>About 랭킹</div>
          <div>
            <span>{rankValueText}</span>
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </div>
        </Button>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  padding: var(--padding-sub) var(--padding-md);
  > div:first-child {
    font-size: 14px;
  }
  > div:last-child {
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: var(--margin-md);
    }
  }
`;

export default PointScoreNavigation;
