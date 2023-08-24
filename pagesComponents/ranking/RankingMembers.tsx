import { Badge } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import { USER_BADGES } from "../../constants/convert";
import { getUserBadgeScore } from "../../helpers/userHelpers";
import { RankingType } from "../../types/page/ranking";
import { IVoteRate } from "../../types/study/studyRecord";
import { IUser } from "../../types/user/user";

interface IRankingMembers {
  memberList: IUser[] | IVoteRate[];
  type: RankingType;
}

function RankingMembers({ memberList, type }: IRankingMembers) {
  const { data: session } = useSession();

  let tempCnt = 0;
  let score;
  let attendCnt;

  return (
    <Layout>
      {type === "score" ? (
        <>
          {memberList?.map((who, idx) => {
            if (score === who.score) {
              tempCnt++;
            } else tempCnt = 0;
            score = who?.score;
            const { badge } = getUserBadgeScore(score, who.uid);

            return (
              <Item key={idx} id={`ranking${who.uid}`}>
                <Rank>{idx - tempCnt + 1}위</Rank>
                <Name>
                  <ProfileIcon size="sm" user={who} isMember={true} />
                  <RankingMine isMine={who.uid === session?.uid}>
                    {who?.name !== "무성" ? who?.name : "비공개"}
                  </RankingMine>
                  <Badge colorScheme={USER_BADGES[badge]}>{badge}</Badge>
                </Name>
                <Score>{score} 점</Score>
              </Item>
            );
          })}
        </>
      ) : type === "attend" ? (
        <>
          {memberList?.map((who, idx) => {
            if (attendCnt === who.cnt) {
              tempCnt++;
            } else tempCnt = 0;
            attendCnt = who.cnt;
            const { badge } = getUserBadgeScore(who.score, who.uid);
            return (
              <Item key={idx} id={`ranking${who.uid}`}>
                <Rank>{idx - tempCnt + 1}위</Rank>
                <Name>
                  <ProfileIcon size="sm" user={who} isMember={true} />
                  <RankingMine isMine={who.uid === session?.uid}>
                    {who?.name !== "무성" ? who?.name : "비공개"}
                  </RankingMine>
                  <Badge colorScheme={USER_BADGES[badge]}>{badge}</Badge>
                </Name>
                <Score>{attendCnt} 회</Score>
              </Item>
            );
          })}
        </>
      ) : null}
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
