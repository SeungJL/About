import { Badge, Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../components/common/skeleton/Skeleton";
import { USER_BADGES } from "../../constants/convert";
import { getUserBadgeScore } from "../../helpers/userHelpers";
import { isRankingLoadingState } from "../../recoil/loadingAtoms";
import { IScore } from "../../types/user/pointSystem";

interface IRankingMembers {
  memberList: IScore[];
}

const DEFAULT_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function RankingMembers({ memberList }: IRankingMembers) {
  const { data: session } = useSession();
  const isLoading = useRecoilValue(isRankingLoadingState);

  return (
    <Layout>
      {!isLoading ? (
        <>
          {memberList?.map((who, idx) => {
            const score = who?.score;
            const { badge } = getUserBadgeScore(score);
            return (
              <Item key={idx} id={`ranking${who.uid}`}>
                <Rank>{idx + 1}위</Rank>
                <RankingMine isMine={who.uid === session?.uid}>
                  {who?.name !== "무성" ? who?.name : "비공개"}
                </RankingMine>
                <Badge colorScheme={USER_BADGES[badge]}>{badge}</Badge>
                <Box ml="auto" />
                <span>{score} 점</span>
              </Item>
            );
          })}
        </>
      ) : (
        <>
          {DEFAULT_ARRAY.map((item) => {
            return (
              <Item key={item}>
                <Rank>
                  <Skeleton>temp</Skeleton>
                </Rank>
                <RankingMine>
                  <Skeleton>temp</Skeleton>
                </RankingMine>
                <InitialBadge>
                  <Skeleton>temp</Skeleton>
                </InitialBadge>
                <Box ml="auto" />
                <Score>
                  <Skeleton>temp</Skeleton>
                </Score>
              </Item>
            );
          })}
        </>
      )}
    </Layout>
  );
}

const Layout = styled.div``;

const Item = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  border-bottom: var(--border-main-light);
  > div {
    text-align: center;
    width: 60px;
  }
`;

const Rank = styled.div`
  margin-right: var(--margin-sub);
  font-weight: 600;
`;

const Score = styled.div`
  margin-left: auto;
`;

const RankingMine = styled.div<{ isMine?: boolean }>`
  margin-right: 8px;
  color: ${(props) => props.isMine && "var(--color-mint)"};
  font-weight: ${(props) => props.isMine && "600"};
`;

const InitialBadge = styled.div`
  width: 59px;
`;

export default RankingMembers;
