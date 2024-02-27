import { Badge, Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Avatar from "../../components2/atoms/Avatar";
import { BADGE_COLOR } from "../../constants/settingValue/badge";
import { RANKING_ANONYMOUS_USERS } from "../../constants/storage/anonymous";
import { getUserBadge } from "../../helpers/userHelpers";
import { IRankingUser } from "../../types/page/ranking";
import { IVoteRate } from "../../types/study/study";

interface IRankingMembers {
  rankingUsers: IVoteRate[];
  isScore: boolean;
}

function RankingMembers({ rankingUsers, isScore }: IRankingMembers) {
  const { data: session } = useSession();

  let dupCnt = 0;
  let value;

  return (
    <Box h="100%" overflow="scroll">
      {rankingUsers?.map((who, idx) => {
        const whoValue = (who as IRankingUser).cnt;
        if (value === whoValue) dupCnt++;
        else dupCnt = 0;
        value = whoValue;
        const user = who.userSummary;
        const { badge } = getUserBadge(who?.userSummary.score, who?.uid);
        return (
          <Item key={idx} id={`ranking${who.uid}`}>
            <Box mr="12px">
              <Rank>{idx - dupCnt + 1}위</Rank>
            </Box>
            <Name>
              <Avatar
                image={user.profileImage}
                avatar={user.avatar}
                uid={user.uid}
                size="md"
                isPriority={idx < 6}
              />

              <RankingMine isMine={who.uid === session?.user?.uid}>
                {!RANKING_ANONYMOUS_USERS.includes(who?.uid)
                  ? user.name
                  : "비공개"}
              </RankingMine>
              <Badge colorScheme={BADGE_COLOR[badge]}>{badge}</Badge>
            </Name>
            <Score>{`${value}${isScore ? "점" : "회"}`}</Score>
          </Item>
        );
      })}
    </Box>
  );
}

const Item = styled.div`
  display: flex;
  padding: 12px 16px;
  padding-right: 20px;
  align-items: center;
  border-bottom: var(--border);
`;

const Name = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Rank = styled.div`
  text-align: start;
  flex: 0.2;
  font-weight: 600;
`;

const Score = styled.div``;

const RankingMine = styled.div<{ isMine?: boolean }>`
  margin: 0 var(--gap-3);
  font-weight: 600;
  color: ${(props) => props.isMine && "var(--color-mint)"};
  font-weight: ${(props) => props.isMine && "600"};
  font-size: 14px;
`;

const InitialBadge = styled.div`
  width: 59px;
`;

export default RankingMembers;
