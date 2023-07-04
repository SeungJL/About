import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useScoreAllQuery } from "../../../hooks/user/pointSystem/queries";
import { SortUserScore } from "../../../libs/utils/userUtils";
import { isPointLoadingState } from "../../../recoil/loadingAtoms";
import { IRankScore } from "../../../types/user";

interface IPointScoreNavigation {
  myPoint: number;
}

function PointScoreNavigation({ myPoint }: IPointScoreNavigation) {
  const { data: session } = useSession();
  const router = useRouter();
  const isGuest = session?.user.name === "guest";
  const [myRank, setMyRank] = useState<IRankScore>();
  const setIsPointLoading = useSetRecoilState(isPointLoadingState);

  useScoreAllQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const arrangedData = SortUserScore(data, myPoint);
      if (arrangedData.isRank)
        setMyRank({ rankNum: arrangedData.rankNum, isRank: true });
      else setMyRank({ percent: arrangedData.percent, isRank: false });

      setIsPointLoading(false);
    },
  });

  return (
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
        <div>
          {myRank === undefined ? (
            <span>New</span>
          ) : myRank?.isRank ? (
            <span> {myRank?.rankNum}위</span>
          ) : (
            <span>상위 {myRank?.percent}%</span>
          )}
          <FontAwesomeIcon icon={faChevronRight} size="xs" />
        </div>
      </Button>
    </Layout>
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
  padding: 12px 8px;
  > div:first-child {
    font-size: 14px;
  }
  > div:last-child {
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: 6px;
    }
  }
`;

export default PointScoreNavigation;
