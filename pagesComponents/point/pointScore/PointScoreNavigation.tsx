import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { sortUserScore } from "../../../helpers/userHelpers";
import { useScoreAllQuery } from "../../../hooks/user/pointSystem/queries";
import { useUserLocationQuery } from "../../../hooks/user/queries";
import { isPointLoadingState } from "../../../recoil/loadingAtoms";
import { IRankScore } from "../../../types/page/ranking";

interface IPointScoreNavigation {
  myPoint: number;
}

function PointScoreNavigation({ myPoint }: IPointScoreNavigation) {
  const { data: session } = useSession();
  const router = useRouter();
  const isGuest = session?.user.name === "guest";

  const setIsPointLoading = useSetRecoilState(isPointLoadingState);

  const [myRank, setMyRank] = useState<IRankScore>();

  const { data: location } = useUserLocationQuery();

  useScoreAllQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const temp = data.filter((who) => who.location === location);
      const arrangedData = sortUserScore(temp, session?.uid as string, "score");
   
      if (arrangedData.isRank)
        setMyRank({ rankNum: arrangedData.rankNum, isRank: true });
      else setMyRank({ percent: arrangedData.percent, isRank: false });
    },
  });

  useEffect(() => {
    if (myRank || isGuest) setIsPointLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRank]);

  return (
    <>
      <Layout>
        <Button onClick={() => router.push("/point/scoreLog")}>
          <div>About 점수</div>
          <div>
            <span>{myPoint || 0}점</span>
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </div>
        </Button>
        <Button onClick={() => router.push("/ranking")}>
          <div>About 랭킹</div>
          {(myRank || isGuest) && (
            <div>
              {isGuest || myRank?.rankNum === -1 ? (
                <span>New</span>
              ) : myRank?.isRank ? (
                <span>지역 {myRank?.rankNum + 1}위</span>
              ) : (
                <span>상위 {myRank?.percent}%</span>
              )}
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
            </div>
          )}
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
