import styled from "styled-components";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Badge, Progress } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import ModalPortal from "../../components/ModalPortal";
import BadgeInfoModal from "../../modals/info/BadgeInfoModal";

import { useRecoilState, useRecoilValue } from "recoil";
import { useParticipationRateQuery } from "../../hooks/user/queries";
import { voteDateState } from "../../recoil/studyAtoms";
import { userBadgeState } from "../../recoil/userAtoms";
import {
  myScoreRank,
  SortUserScore,
  userBadgeScore,
} from "../../libs/utils/userUtils";

import { IRankScore, USER_BADGES } from "../../types/user";
import { useRouter } from "next/router";
import NotCompletedModal from "../../modals/system/NotCompletedModal";

import {
  usePointAllQuery,
  usePointQuery,
  useScoreAllQuery,
  useScoreQuery,
} from "../../hooks/user/pointSystem/queries";
import { usePointMutation } from "../../hooks/user/pointSystem/mutation";
import Header from "../../components/layouts/Header";
import {
  faChevronRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function PointScore() {
  const { data: session } = useSession();
  const router = useRouter();
  const isGuest = session?.user.name === "guest";

  const [isNotComplete, setIsNotComplete] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const voteDate = useRecoilValue(voteDateState);
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
    },
  });
  const { mutate } = usePointMutation();

  useEffect(() => {
    // if (myPoint < 0) mutate(-myPoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPoint]);

  const { data: monthCnt } = useParticipationRateQuery(
    dayjs().date(0),
    dayjs().date(dayjs()?.daysInMonth())
  );

  const myMonthCnt = monthCnt?.find((user) => user.uid === session?.uid)?.cnt;

  return (
    <>
      <Layout>
        <>
          <ProgressWrapper>
            <Grade>
              <div>
                <Badge marginRight="6px" colorScheme={userBadge.color}>
                  {userBadge.badge}
                </Badge>
                <span style={{ color: userBadge.color }}>{myPoint}점</span>
                <IconWrapper onClick={() => setIsModal(true)}>
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </IconWrapper>
              </div>
              {userBadge?.badge !== "에스프레소" && (
                <div>
                  <span style={{ color: scoreInfo.nextBadge.color }}>
                    {scoreInfo.nextScore}점
                  </span>
                  <Badge
                    colorScheme={scoreInfo.nextBadge.color}
                    marginLeft="6px"
                  >
                    {scoreInfo.nextBadge.badge}
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
                <span>{myPoint}점</span>
                <FontAwesomeIcon icon={faChevronRight} size="xs" />
              </div>
            </Button>
            <Button onClick={() => router.push("/ranking")}>
              <div>About 랭킹</div>
              <div>
                {myRank === undefined ? null : myRank?.isRank ? (
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
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <BadgeInfoModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
      {isNotComplete && (
        <ModalPortal setIsModal={setIsNotComplete}>
          <NotCompletedModal setIsModal={setIsNotComplete} />
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
  margin: 20px 14px;
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
