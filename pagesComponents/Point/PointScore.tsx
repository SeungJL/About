import { Badge, Progress, Skeleton } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

import ModalPortal from "../../components/ModalPortal";
import BadgeInfoModal from "../../modals/info/BadgeInfoModal";

import { useRecoilState } from "recoil";
import { useUserParticipationRateQuery } from "../../hooks/user/queries";
import { SortUserScore, userBadgeScore } from "../../libs/utils/userUtils";
import { userBadgeState } from "../../recoil/userAtoms";

import { useRouter } from "next/router";
import { IRankScore, USER_BADGES } from "../../types/user";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { usePointMutation } from "../../hooks/user/pointSystem/mutation";
import {
  useScoreAllQuery,
  useScoreQuery,
} from "../../hooks/user/pointSystem/queries";
import { isPointLoadingState } from "../../recoil/loadingAtoms";

function PointScore({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const isGuest = session?.user.name === "guest";
  const [isPointLoading, setIsPointLoading] =
    useRecoilState(isPointLoadingState);

  const [isBadgeInfoModal, setIsBadgeInfoModal] = useState(false);

  const [userBadge, setUserBadge] = useRecoilState(userBadgeState);
  const [myRank, setMyRank] = useState<IRankScore>();
  const [scoreInfo, setScoreInfo] = useState({
    value: 0,
    nextBadge: { badge: null, color: "" },
    scoreGap: 30,
    nextScore: 30,
  });

  const { data } = useScoreQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const { badge, badgeScore, nextBadge, gap, nextScore } = userBadgeScore(
        data.score
      );

      setUserBadge({ badge, color: USER_BADGES[badge] });
      setScoreInfo({
        value: badgeScore,
        nextBadge: { badge: nextBadge, color: USER_BADGES[nextBadge] },
        scoreGap: gap,
        nextScore,
      });
    },
  });

  const myPoint = data?.score;

  useScoreAllQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const arrangedData = SortUserScore(data, myPoint);
      if (arrangedData.isRank)
        setMyRank({ myRank: arrangedData.myRank, isRank: true });
      else setMyRank({ percent: arrangedData.percent, isRank: false });
      setIsPointLoading(false);
    },
  });
  const { mutate } = usePointMutation();

  useEffect(() => {
    // if (myPoint < 0) mutate(-myPoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPoint]);

  const { data: monthCnt } = useUserParticipationRateQuery(
    dayjs().date(0),
    dayjs().date(dayjs()?.daysInMonth())
  );

  const myMonthCnt = monthCnt?.find((user) => user.uid === session?.uid)?.cnt;

  return (
    <>
      <Skeleton
        m="20px 14px"
        borderRadius="8px"
        startColor="RGB(227, 230, 235)"
        endColor="rgb(246,247,249)"
        isLoaded={!isPointLoading}
      >
        <Layout>
          <>
            <ProgressWrapper>
              <Grade>
                <div>
                  <Badge marginRight="6px" colorScheme={userBadge.color}>
                    {userBadge.badge}
                  </Badge>
                  <span style={{ color: userBadge.color }}>
                    {myPoint || "0"}점
                  </span>
                  <IconWrapper onClick={() => setIsBadgeInfoModal(true)}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </IconWrapper>
                </div>
                {userBadge?.badge !== "에스프레소" && (
                  <div>
                    <span style={{ color: scoreInfo.nextBadge.color }}>
                      {scoreInfo.nextScore}점
                    </span>
                    <Badge
                      colorScheme={scoreInfo.nextBadge.color || "orange"}
                      marginLeft="6px"
                    >
                      {scoreInfo.nextBadge.badge || "라떼"}
                    </Badge>
                  </div>
                )}
              </Grade>
              <Progress
                value={(scoreInfo.value / scoreInfo.scoreGap) * 100}
                size="xs"
                color="var(--font-h4)"
              />
            </ProgressWrapper>
            <Nav>
              <Button onClick={() => router.push("/point/scorelog")}>
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
                    <span> {myRank?.myRank}위</span>
                  ) : (
                    <span>상위 {myRank?.percent}%</span>
                  )}
                  <FontAwesomeIcon icon={faChevronRight} size="xs" />
                </div>
              </Button>
            </Nav>
          </>
        </Layout>
      </Skeleton>
      {isBadgeInfoModal && (
        <ModalPortal setIsModal={setIsBadgeInfoModal}>
          <BadgeInfoModal setIsModal={setIsBadgeInfoModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  border-radius: var(--border-radius2);
  background-color: white;
  box-shadow: var(--box-shadow);
`;

const Intro = styled.div`
  padding: 12px 0px;
  font-size: 16px;
  color: var(--font-h3);
  > span {
    color: var(--font-h1);
    font-size: 18px;
    font-weight: 600;
  }
`;

const ProgressWrapper = styled.div`
  margin-bottom: 12px;
`;

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    > span {
      font-size: 12px;
    }
  }
`;

const IconWrapper = styled.div`
  color: var(--font-h2);
  font-size: 14px;
  margin-left: 8px;
`;

const Nav = styled.nav`
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

export default PointScore;
