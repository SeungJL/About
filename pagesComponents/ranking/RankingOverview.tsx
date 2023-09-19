import { Badge } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import Skeleton from "../../components/common/skeleton/Skeleton";
import { BADGE_COLOR } from "../../constants/badge";
import { schemeToColor } from "../../helpers/converterHelpers";
import { getUserBadge } from "../../helpers/userHelpers";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { isGuestState } from "../../recoil/userAtoms";
import {
  ISortedUserAttends,
  ISortedUserScores,
  RankingCategory,
  RankingType,
} from "../../types/page/ranking";

import { UserBadge } from "../../types/user/user";

interface IRankingOverview {
  rankInfo: RankingType;
  isLoading: boolean;
  category: RankingCategory;
}

function RankingOverview({ rankInfo, isLoading, category }: IRankingOverview) {
  const typeErrorToast = useTypeErrorToast();

  const isGuest = useRecoilValue(isGuestState);
  const [userBadge, setUserBadge] = useState<UserBadge>("아메리카노");

  const { data: userInfo } = useUserInfoQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const badge = getUserBadge(data.score, data.uid);
      setUserBadge(badge);
    },
    onError: (e) => typeErrorToast(e, "user"),
  });

  const totalCnt =
    category !== "누적"
      ? (rankInfo as ISortedUserAttends)?.attendArr.length
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
            <Skeleton isLoad={!isLoading}>전체: {totalCnt}명</Skeleton>
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
              <ScoreText>등급:</ScoreText>
              <Badge
                colorScheme={BADGE_COLOR[userBadge]}
                fontSize="13px"
                mb="6px"
              >
                {userBadge}
              </Badge>
            </Skeleton>
          </RankBadge>
          <Score>
            <Skeleton isLoad={!isLoading}>
              <ScoreText>점수:</ScoreText>
              <ScoreValue color={schemeToColor(BADGE_COLOR[userBadge])}>
                {userInfo?.score || 0}점
              </ScoreValue>
            </Skeleton>
          </Score>
        </ScoreContainer>
      </Layout>
    </>
  );
}
const Layout = styled.div`
  margin: 0 var(--margin-main);
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
  font-weight: 600;
  margin-right: var(--margin-min);
`;

const TotalCnt = styled.div`
  color: var(--font-h3);
  font-size: 13px;
`;

const RankNum = styled.span`
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

const RankBadge = styled.div`
  display: flex;
  align-items: center;
`;

const ScoreText = styled.span`
  color: var(--font-h1);
  font-weight: 600;
  margin-right: var(--margin-min);
`;

const ScoreValue = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

const Score = styled.div`
  margin-top: 2px;
`;

export default RankingOverview;
