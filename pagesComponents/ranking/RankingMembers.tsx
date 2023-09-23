import { Badge } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import ProfileIcon from "../../components/common/user/Profile/ProfileIcon";
import { BADGE_COLOR } from "../../constants/contentsValue/badge";
import { RANKING_ANONYMOUS_USERS } from "../../constants/storage/anonymous";
import { getUserBadge } from "../../helpers/userHelpers";
import {
  IRankingUser,
  ISortedUserAttends,
  ISortedUserScores,
  RankingCategory,
  RankingType,
} from "../../types/page/ranking";
import { IUser } from "../../types/user/user";

interface IRankingMembers {
  rankInfo: RankingType;
  category: RankingCategory;
}

function RankingMembers({ rankInfo, category }: IRankingMembers) {
  const { data: session } = useSession();

  let dupCnt = 0;
  let value;

  const isAttendCategory = category !== "누적";
  const memberList = isAttendCategory
    ? (rankInfo as ISortedUserAttends)?.attendArr
    : ((rankInfo as ISortedUserScores)?.scoreArr as IUser[]);

  return (
    <Layout>
      {memberList?.map((who, idx) => {
        const whoValue =
          value !== isAttendCategory
            ? (who as IUser).score
            : (who as IRankingUser).cnt;

        if (value === whoValue) dupCnt++;
        else dupCnt = 0;
        value = whoValue;
        const badge = getUserBadge(who?.score, who?.uid);
        return (
          <Item key={idx} id={`ranking${who.uid}`}>
            <Rank>{idx - dupCnt + 1}위</Rank>
            <Name>
              <ProfileIcon size="sm" user={who} isMember={true} />
              <RankingMine isMine={who.uid === session?.uid}>
                {!RANKING_ANONYMOUS_USERS.includes(who?.uid)
                  ? who?.name
                  : "비공개"}
              </RankingMine>
              <Badge colorScheme={BADGE_COLOR[badge]}>{badge}</Badge>
            </Name>
            <Score>{`${value} ${isAttendCategory ? "회" : "점"}`}</Score>
          </Item>
        );
      })}
    </Layout>
  );
}

const Layout = styled.div``;

const Item = styled.div`
  display: flex;
  padding: var(--padding-sub);
  align-items: center;
  border-bottom: var(--border-main-light);
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
  margin: 0 var(--margin-sub);
  font-weight: 600;
  color: ${(props) => props.isMine && "var(--color-mint)"};
  font-weight: ${(props) => props.isMine && "600"};
  font-size: 14px;
`;

const InitialBadge = styled.div`
  width: 59px;
`;

export default RankingMembers;
