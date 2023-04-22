import styled from "styled-components";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Badge, Progress } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import ModalPortal from "../../../components/ModalPortal";
import BadgeInfoModal from "../../../modals/info/BadgeInfoModal";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  useParticipationRateQuery,
  useScoreAllQuery,
  useScoreQuery,
} from "../../../hooks/user/queries";
import { voteDateState } from "../../../recoil/studyAtoms";
import { userBadgeState } from "../../../recoil/userAtoms";
import {
  myScoreRank,
  SortUserScore,
  userBadgeScore,
} from "../../../libs/utils/userUtils";

import { IRankScore, USER_BADGES } from "../../../types/user";
import { useRouter } from "next/router";
import NotCompletedModal from "../../../modals/system/NotCompletedModal";

function UserOverview() {
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
    nextPoint: 30,
  });

  const { data } = useScoreQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const { badge, badgePoint, nextBadge, gap, nextPoint } = userBadgeScore(
        data.point
      );
      setUserBadge({ badge, color: USER_BADGES[badge] });
      setScoreInfo({
        value: badgePoint,
        nextBadge: { badge: nextBadge, color: USER_BADGES[nextBadge] },
        scoreGap: gap,
        nextPoint,
      });
    },
  });

  const myPoint = data?.point;

  useScoreAllQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const arrangedData = SortUserScore(data, myPoint);
      if (arrangedData.isRank)
        setMyRank({ myRank: arrangedData.myRank, isRank: true });
      else setMyRank({ percent: arrangedData.percent, isRank: false });
    },
  });

  const { data: monthCnt } = useParticipationRateQuery(
    voteDate.date(1),
    voteDate.date(voteDate.daysInMonth())
  );

  const myMonthCnt = monthCnt?.find((user) => user.uid === session?.uid)?.cnt;

  return (
    <>
      <Layout>
        <Header>
          <span>{session?.user.name}</span>님의 활동 현황이에요!
        </Header>
        {!isGuest ? (
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
                <div>
                  <span style={{ color: scoreInfo.nextBadge.color }}>
                    {scoreInfo.nextPoint}점
                  </span>
                  <Badge
                    colorScheme={scoreInfo.nextBadge.color}
                    marginLeft="6px"
                  >
                    {scoreInfo.nextBadge.badge}
                  </Badge>
                </div>
              </Grade>
              <Progress
                value={(scoreInfo.value / scoreInfo.scoreGap) * 100}
                size="xs"
                color="var(--font-h4)"
              />
            </ProgressWrapper>
            <Info>
              {/* <Item onClick={() => router.push(`/record`)}>
                <span>{dayjs().month() + 1}월 참여</span>

                <span>{myMonthCnt}회</span>
              </Item> */}{" "}
              <Item onClick={() => setIsNotComplete(true)}>
                <span>{dayjs().month() + 1}월 참여</span>

                <span>{myMonthCnt}회</span>
              </Item>
              <Item onClick={() => setIsNotComplete(true)}>
                <span>내 점수</span>
                <span>{myPoint}점</span>
              </Item>
              <Item onClick={() => router.push(`/ranking`)}>
                <span>랭킹 </span>
                {myRank === undefined ? null : myRank?.isRank ? (
                  <span> {myRank?.myRank}위</span>
                ) : (
                  <span>상위 {myRank?.percent}%</span>
                )}
              </Item>
            </Info>
          </>
        ) : (
          <>
            <ProgressWrapper>
              <Grade>
                <div>
                  <Badge marginRight="6px">아메리카노</Badge>
                  <span>0 점</span>
                  <IconWrapper onClick={() => setIsModal(true)}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </IconWrapper>
                </div>
                <div>
                  <span style={{ color: "var(--color-orange)" }}>30점</span>
                  <Badge colorScheme="orange" marginLeft="6px">
                    라떼
                  </Badge>
                </div>
              </Grade>
              <Progress value={0} size="xs" color="var(--font-h4)" />
            </ProgressWrapper>
            <Info>
              <Item onClick={() => setIsNotComplete(true)}>
                <span>{dayjs().month() + 1}월 참여</span>

                <span>0 회</span>
              </Item>

              <Item onClick={() => setIsNotComplete(true)}>
                <span>내 점수</span>
                <span>0 점</span>
              </Item>

              <Item onClick={() => router.push(`/ranking`)}>
                <span>랭킹 </span>
                <span>--</span>
              </Item>
            </Info>
          </>
        )}
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
  margin: 0 14px;

  border-bottom-left-radius: 17px;
`;

const Header = styled.header`
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
  margin-top: px;
  margin-bottom: 12px;
`;

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
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
  margin-left: 6px;
`;

const Info = styled.div`
  display: flex;
  height: 64px;
  margin-top: 8px;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Item = styled.div`
  border-radius: 8px;
  font-size: 11px;
  padding: 4px 0;
  width: 108px;
  color: var(--font-h2);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--font-h7);
  > span:last-child {
    font-size: 14px;
    font-weight: 700;
    color: var(--font-h2);
  }
`;

const HrCol = styled.div`
  width: 1px;
  margin: 8px 0;
  background-color: var(--font-h5);
`;

export default UserOverview;
