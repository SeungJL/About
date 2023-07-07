import { Badge } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import Skeleton from "../../components/common/Skeleton";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { getUserBadgeScore } from "../../libs/utils/userUtils";
import { IMyRank } from "../../pages/ranking";
import { isRankingLoadingState } from "../../recoil/loadingAtoms";
import { IUserBadge, USER_BADGES } from "../../types/user";

interface IRankingOverview {
  myRank: IMyRank;
  length: number;
}

function RankingOverview({ myRank, length }: IRankingOverview) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const isLoading = useRecoilValue(isRankingLoadingState);
  const [userBadge, setUserBadge] = useState<IUserBadge>();

  const { data: userInfo } = useUserInfoQuery({
    enabled: !isGuest,
    onSuccess(data) {
      const { badge } = getUserBadgeScore(data?.score);
      setUserBadge({ badge, color: USER_BADGES[badge] });
    },
  });

  return (
    <>
      <Layout>
        <Myrank>
          {myRank?.isRank ? (
            <span>
              <Skeleton isLoad={!isLoading}>
                랭킹:
                <RankNum> {isGuest ? "--" : myRank?.rankNum} 위</RankNum>
              </Skeleton>
            </span>
          ) : (
            <span>
              <Skeleton isLoad={!isLoading}>상위 {myRank?.percent}%</Skeleton>
            </span>
          )}
          <span>
            <Skeleton isLoad={!isLoading}>전체: {length}명</Skeleton>
          </span>
        </Myrank>
        <Profile isGuest={isGuest}>
          <Skeleton isLoad={!isLoading}>
            <ProfileIcon user={userInfo || "guest"} size="xl" />
            <span>{session?.user.name}</span>
          </Skeleton>
        </Profile>
        <ScoreContainer>
          <RankBadge>
            <Skeleton isLoad={!isLoading}>
              등급: &nbsp;
              <Badge colorScheme={userBadge?.color} fontSize="13px" mb="6px">
                {userBadge?.badge}
              </Badge>
            </Skeleton>
          </RankBadge>
          <Score>
            <Skeleton isLoad={!isLoading}>
              점수: &nbsp; <span>{userInfo?.score || 0}점</span>
            </Skeleton>
          </Score>
        </ScoreContainer>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  height: 25vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Profile = styled.div<{ isGuest: boolean }>`
  text-align: center;
  margin-top: 16px;
  > span:last-child {
    display: inline-block;
    margin-top: 8px;
    font-size: ${(props) => (props.isGuest ? "18px" : "12px")};
    font-weight: 600;
  }
`;
const Myrank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  > span:first-child {
    display: inline-block;
    margin-bottom: 6px;
  }
  > span:last-child {
    font-size: 12px;
  }
`;

const RankNum = styled.span`
  font-size: 20px;
  font-weight: 800;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 120px;
`;

const Score = styled.div`
  margin-top: 2px;
  width: max-content;
`;

const RankBadge = styled.div`
  display: flex;
  align-items: center;
`;

export default RankingOverview;
