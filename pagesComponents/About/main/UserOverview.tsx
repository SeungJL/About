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
import { myScoreRank, userBadgeScore } from "../../../libs/utils/userUtils";

import { USER_BADGES } from "../../../types/user";

function UserOverview() {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  console.log(session);
  const [isModal, setIsModal] = useState(false);
  const voteDate = useRecoilValue(voteDateState);
  const [userBadge, setUserBadge] = useRecoilState(userBadgeState);
  const [myRank, setMyRank] = useState(0);
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
      setMyRank(myScoreRank(data, myPoint));
    },
  });

  const { data: monthCnt } = useParticipationRateQuery(
    voteDate.date(1),
    voteDate.date(voteDate.daysInMonth())
  );
  const myMonthCnt = monthCnt?.find(
    (user) => user.name === session?.user.name
  )?.cnt;

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
              <IconWrapper onClick={() => setIsModal(true)}>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </IconWrapper>
            </ProgressWrapper>
            <Info>
              <Item>
                <span>{dayjs().month() + 1}월 참여 횟수</span>
                <span>{myMonthCnt}회</span>
              </Item>
              <HrCol />
              <Item>
                <span>내 점수</span>
                <span>{myPoint}점</span>
              </Item>
              <HrCol />
              <Item>
                <span>랭킹</span>
                {myRank !== 0 && <span> 상위 {myRank}%</span>}
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
                </div>
                <div>
                  <span style={{ color: "var(--color-orange)" }}>30점</span>
                  <Badge colorScheme="orange" marginLeft="6px">
                    라떼
                  </Badge>
                </div>
              </Grade>
              <Progress value={0} size="xs" color="var(--font-h4)" />
              <IconWrapper onClick={() => setIsModal(true)}>
                <span>등급</span>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </IconWrapper>
            </ProgressWrapper>
            <Info>
              <Item>
                <span>{dayjs().month() + 1}월 참여 횟수</span>
                <span>0회</span>
              </Item>
              <HrCol />
              <Item>
                <span>내 점수</span>
                <span>0점</span>
              </Item>
              <HrCol />
              <Item>
                <span>랭킹</span>
                <span>상위 100%</span>
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
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 14px;
  padding-bottom: 6px;
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
  margin-bottom: 12px;

  position: relative;
`;

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  align-items: center;
  > div {
    > span {
      font-size: 12px;
    }
  }
`;

const IconWrapper = styled.div`
  color: var(--font-h3);
  font-size: 14px;
  position: absolute;
  right: 0%;
  bottom: -20px;
`;

const Info = styled.div`
  display: flex;
  height: 54px;
  margin-top: 6px;
  > div:last-child {
    border: none;
  }
`;

const Item = styled.div`
  font-size: 12px;
  padding: 2px 0;
  flex: 1;
  color: var(--font-h3);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  > span:last-child {
    font-size: 14px;
    font-weight: 600;
    color: var(--font-h2);
  }
`;

const HrCol = styled.div`
  width: 1px;
  margin: 8px 0;
  background-color: var(--font-h5);
`;

export default UserOverview;
