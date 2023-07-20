import { Badge } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import Skeleton from "../../components/common/skeleton/Skeleton";
import { USER_BADGES } from "../../constants/convert";
import { getUserBadgeScore } from "../../helpers/userHelpers";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { IMyRank } from "../../pages/ranking";
import { isRankingLoadingState } from "../../recoil/loadingAtoms";
import { IUserBadge } from "../../types/user/user";

interface IRankingOverview {
  myRank: IMyRank;
  length: number;
}

function RankingOverview({ myRank, length }: IRankingOverview) {
  const typeErrorToast = useTypeErrorToast();
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
    onError: (e) => typeErrorToast(e, "user"),
  });

  useEffect(() => {
    if (isGuest)
      setUserBadge({ badge: "아메리카노", color: USER_BADGES["아메리카노"] });
  }, [isGuest]);

  return (
    <>
      <Layout>
        <Myrank>
          <div>
            {myRank?.isRank ? (
              <>
                <span>랭킹:</span>
                <span>
                  <Skeleton isLoad={!isLoading}>
                    <RankNum>
                      {isGuest ? "--" : myRank?.rankNum} <span>위</span>
                    </RankNum>
                  </Skeleton>
                </span>
              </>
            ) : (
              <div>
                <Skeleton isLoad={!isLoading}>
                  <RankPercent>
                    상위 <span>{myRank?.percent}%</span>
                  </RankPercent>
                </Skeleton>
              </div>
            )}
          </div>
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
              <Name>등급:</Name>
              <Badge colorScheme={userBadge?.color} fontSize="13px" mb="6px">
                {userBadge?.badge}
              </Badge>
            </Skeleton>
          </RankBadge>
          <Score>
            <Skeleton isLoad={!isLoading}>
              <Name>점수:</Name>
              <span>{userInfo?.score || 0}점</span>
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

  > div:first-child {
    display: flex;
    align-items: center;
    margin-bottom: var(--margin-min);
    > span:first-child {
      color: var(--font-h1);
      padding-top: 2px;
      font-weight: 600;
      margin-right: var(--margin-min);
    }
  }
  > span:last-child {
    color: var(--font-h3);
    font-size: 13px;
  }
`;

const Name = styled.span`
  margin-right: var(--margin-md);
  color: var(--font-h1);
  font-weight: 600;
`;

const RankNum = styled.span`
  font-size: 20px;
  font-weight: 800;
  > span {
    font-size: 18px;
  }
`;

const RankPercent = styled.span`
  font-size: 16px;
  font-weight: 800;
  > span {
    font-size: 18px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: var(--margin-max);
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
