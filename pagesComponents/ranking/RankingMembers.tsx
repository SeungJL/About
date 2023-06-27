import { Badge, Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../components/common/Skeleton";
import { getUserBadgeScore } from "../../libs/utils/userUtils";
import { isRankingLoadingState } from "../../recoil/loadingAtoms";
import { USER_BADGES } from "../../types/user";
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
                <Skeleton isLoad={!isLoading}>
                  <Rank>{idx + 1}위</Rank>
                </Skeleton>
                <Skeleton isLoad={!isLoading}>
                  <RankingMine isMine={who.uid === session?.uid}>
                    {who?.name !== "무성" ? who?.name : "비공개"}
                  </RankingMine>
                </Skeleton>{" "}
                <Skeleton isLoad={!isLoading}>
                  <Badge marginRight="6px" colorScheme={USER_BADGES[badge]}>
                    {badge}
                  </Badge>
                </Skeleton>
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
                <Skeleton>
                  <Rank>temp</Rank>
                </Skeleton>
                <Skeleton>
                  <RankingMine>temp</RankingMine>
                </Skeleton>
                <Skeleton>
                  <Badge marginRight="6px" width="50px">
                    temp
                  </Badge>
                </Skeleton>
                <Box ml="auto" />
                <Skeleton>
                  <Score>temp</Score>
                </Skeleton>
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
  border-bottom: 1px solid var(--font-h5);

  > * {
    > div {
      text-align: center;
      width: 60px;
    }
  }
`;

const Rank = styled.div`
  margin-right: 12px;
  font-weight: 600;
`;

const Score = styled.div`
  margin-left: auto;
`;

const RankingMine = styled.div<{ isMine?: boolean }>`
  margin-right: 8px;
  color: ${(props) => (props.isMine ? "var(--color-mint)" : null)};
  font-weight: ${(props) => (props.isMine ? "600" : null)};
`;

export default RankingMembers;
