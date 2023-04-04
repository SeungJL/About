import { Badge, Icon, Progress, useTheme } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleQuestion,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../../components/ModalPortal";
import { useScoreMutation } from "../../../hooks/user/mutations";
import {
  useParticipationRateQuery,
  useScoreQuery,
} from "../../../hooks/user/queries";
import { userBadgeScore } from "../../../libs/utils/userUtils";
import BadgeInfoModal from "../../../modals/info/BadgeInfoModal";
import { voteDateState } from "../../../recoil/studyAtoms";
import { IUserBadge, UserBadge, USER_BADGES } from "../../../types/user";
import { userBadgeState } from "../../../recoil/userAtoms";

function UserOverview() {
  const { data: session } = useSession();
  const [isModal, setIsModal] = useState(false);
  const voteDate = useRecoilValue(voteDateState);
  const [userBadge, setUserBadge] = useRecoilState(userBadgeState);
  const [scoreInfo, setScoreInfo] = useState({
    value: 0,
    nextBadge: { badge: null, color: "" },
    scoreGap: 30,
    nextPoint: 30,
  });

  const { data } = useScoreQuery({
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

  const { data: monthCnt } = useParticipationRateQuery(
    voteDate.date(1),
    voteDate.date(voteDate.daysInMonth())
  );
  const myMonthCnt = monthCnt?.find(
    (user) => user.name === session?.user.name
  ).cnt;
  const myPoint = data?.point;

  return (
    <>
      <Layout>
        <Header>
          <b>{session?.user.name}</b>님의 활동 현황이에요 !
        </Header>
        <ProgressWrapper>
          <Grade>
            <div>
              <Badge
                fontSize="12"
                marginRight="6px"
                colorScheme={userBadge.color}
              >
                {userBadge.badge}
              </Badge>
              <span style={{ color: userBadge.color }}>{myPoint}점</span>
            </div>
            <div>
              <span style={{ color: scoreInfo.nextBadge.color }}>
                {scoreInfo.nextPoint}점
              </span>
              <Badge
                fontSize={12}
                variant="subtle"
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
            <span>등급</span>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </IconWrapper>
        </ProgressWrapper>
        <Info>
          <Item>
            <span>이번 달 참여</span>
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
            <span>상위 50%</span>
          </Item>
        </Info>
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
  font-size: 18px;
`;

const ProgressWrapper = styled.div`
  margin-bottom: 12px;

  position: relative;
`;

const IconWrapper = styled.div`
  color: var(--font-h3);
  font-size: 11px;
  position: absolute;
  right: 0%;
  bottom: -20px;
  > span:first-child {
    margin-right: 4px;
  }
`;

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  align-items: center;
  > div {
    > span {
      font-size: 12px;
      color: var(--font-h2);
    }
  }
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
  font-size: 13px;
  padding: 2px 0;
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  > span:last-child {
    font-size: 13px;
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
