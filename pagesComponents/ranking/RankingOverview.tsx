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
    onSuccess(data) {
      const { badge } = getUserBadgeScore(data.score);
      setUserBadge({ badge, color: USER_BADGES[badge] });
    },
  });

  return (
    <>
      <Layout>
        <Skeleton isLoad={!isLoading}>
          <Myrank>
            {myRank?.isRank ? (
              <span>
                랭킹:
                <span> {isGuest ? "--" : myRank?.rankNum} 위</span>
              </span>
            ) : (
              <span>상위 {myRank?.percent}%</span>
            )}{" "}
            <span>전체: {length}명</span>
          </Myrank>
        </Skeleton>
        <Profile isGuest={isGuest}>
          <Skeleton isLoad={!isLoading}>
            {!isGuest && <ProfileIcon user={userInfo} size="xl" />}
            <span>{session?.user.name}</span>
          </Skeleton>
        </Profile>
        <Skeleton isLoad={!isLoading}>
          <Score>
            <span>
              등급: &nbsp;
              <Badge colorScheme={userBadge?.color} fontSize="13px" mb="6px">
                {userBadge?.badge}
              </Badge>
            </span>
            <span>
              점수: &nbsp; <span>{userInfo?.score}점</span>
            </span>
          </Score>
        </Skeleton>
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
    > span {
      font-size: 20px;
      font-weight: 800;
    }
  }
  > span:last-child {
    font-size: 12px;
  }
`;

const Score = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 120px;

  > span {
    > span {
      font-weight: 600;
    }
  }
`;

export default RankingOverview;
