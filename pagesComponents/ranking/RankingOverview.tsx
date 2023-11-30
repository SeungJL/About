import { Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../components/common/masks/skeleton/Skeleton";
import ProfileIcon from "../../components/common/user/Profile/ProfileIcon";
import { BADGE_COLOR } from "../../constants/settingValue/badge";
import { schemeToColor } from "../../helpers/converterHelpers";
import { getUserBadge } from "../../helpers/userHelpers";
import { isGuestState } from "../../recoil/userAtoms";
import {
  ISortedUserAttends,
  ISortedUserScores,
  RankingCategory,
  RankingType,
} from "../../types/page/ranking";

import { IUser, UserBadge } from "../../types/user/user";

interface IRankingOverview {
  userInfo: IUser;
  rankInfo: RankingType;
  isLoading: boolean;
  category: RankingCategory;
}

function RankingOverview({
  userInfo,
  rankInfo,
  isLoading,
  category,
}: IRankingOverview) {
  const isGuest = useRecoilValue(isGuestState);
  const [userBadge, setUserBadge] = useState<UserBadge>();

  useEffect(() => {
    if (isGuest) setUserBadge("아메리카노");
    if (!userInfo) return;
    const { badge } = getUserBadge(userInfo.score, userInfo.uid);
    setUserBadge(badge);
  }, [isGuest, userInfo]);

  const totalCnt =
    category !== "누적"
      ? (rankInfo as ISortedUserAttends)?.attendArr?.length
      : (rankInfo as ISortedUserScores)?.scoreArr?.length;

  return (
    <>
      <Layout>
        <RankContainer>
          <MyRank>
            <Skeleton isLoad={!isLoading}>
              <MyRankText>랭킹:</MyRankText>
              {rankInfo?.isRankNum ? (
                <RankNum>
                  {rankInfo?.rankValue === 0
                    ? "NEW"
                    : `${rankInfo?.rankValue}위`}
                </RankNum>
              ) : (
                <RankPercent>
                  상위 <span>{rankInfo?.rankValue}%</span>
                </RankPercent>
              )}
            </Skeleton>
          </MyRank>
          <TotalCnt>
            <Skeleton isLoad={!isLoading}>
              전체: {totalCnt && `${totalCnt}명`}
            </Skeleton>
          </TotalCnt>
        </RankContainer>
        <ProfileContainer isGuest={isGuest}>
          <Skeleton isLoad={!isLoading}>
            <ProfileWrapper>
              <ProfileIcon user={userInfo || "guest"} size="xl" />
              <ProfileUserName>{userInfo?.name}</ProfileUserName>
            </ProfileWrapper>
          </Skeleton>
        </ProfileContainer>
        <ScoreContainer>
          <RankBadge>
            <Skeleton isLoad={!isLoading}>
              <BadgeWrapper>
                <ScoreText>배지:</ScoreText>
                <Badge
                  colorScheme={BADGE_COLOR[userBadge]}
                  fontSize="14px"
                  border="1px solid var(--font-h5)"
                >
                  {userBadge}
                </Badge>
              </BadgeWrapper>
            </Skeleton>
          </RankBadge>
          <Score>
            <Skeleton isLoad={!isLoading}>
              <ScoreValue color={schemeToColor(BADGE_COLOR[userBadge])}>
                점수: {userInfo?.score || 0}점
              </ScoreValue>
            </Skeleton>
          </Score>
        </ScoreContainer>
      </Layout>
    </>
  );
}
const Layout = styled.div`
  margin: 0 var(--margin-sub);
  height: 20vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

/** RANK CONTAINER */
const RankContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyRank = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-min);
`;

const MyRankText = styled.span`
  color: var(--font-h1);
  font-size: 13px;
  font-weight: 600;
  margin-right: var(--margin-min);
`;

const TotalCnt = styled.div`
  height: 20px;
  color: var(--font-h3);
  font-size: 13px;
  width: 67px;
`;

const RankNum = styled.span`
  height: 30px;
  font-size: 20px;
  font-weight: 700;
`;

const RankPercent = styled.span`
  font-size: 16px;
  font-weight: 800;
  > span {
    font-size: 18px;
  }
`;

/** PROFILE CONTAINER */
const ProfileContainer = styled.div<{ isGuest: boolean }>`
  text-align: center;
  margin-top: 16px;
  flex: 1;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileUserName = styled.span`
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
`;

/** SCORE CONTAINER */

const ScoreContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BadgeWrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
`;

const RankBadge = styled.div`
  display: flex;
  font-size: 13px;
  justify-content: center;

  align-items: center;
`;

const ScoreText = styled.span`
  color: var(--font-h1);
  font-weight: 600;

  margin-right: var(--margin-min);
`;

const ScoreValue = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 13px;
  display: flex;
  margin-top: 2px;
  align-items: center;
`;

const Score = styled.div`
  height: 20px;
`;

export default RankingOverview;
