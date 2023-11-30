import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { UserIcon } from "../../../../../components/common/Icon/icons";
import ProfileIconXsOverwrap from "../../../../../components/common/user/Profile/ProfileIconXsOverwrap";
import { MAX_USER_PER_PLACE } from "../../../../../constants/settingValue/study/study";
import { voteDateState } from "../../../../../recoil/studyAtoms";
import { GatherStatus } from "../../../../../types/page/gather";
import { IUser } from "../../../../../types/user/user";

interface IGatherBlockParticipants {
  status: GatherStatus;
  participants: IUser[];
  maxCnt: number;
}

function GatherBlockParticipants({
  status,
  participants,
  maxCnt,
}: IGatherBlockParticipants) {
  const { data: session } = useSession();

  const voteDate = useRecoilValue(voteDateState);
  const isMyVote = participants.find((who) => who.uid === session?.uid);
  const voterCnt = participants.length;

  const voteStatus: "GOOD" | "FULL" =
    status === "pending"
      ? isMyVote
        ? "GOOD"
        : voterCnt >= MAX_USER_PER_PLACE
        ? "FULL"
        : null
      : null;

  const isMax = participants.length >= MAX_USER_PER_PLACE;

  const VOTER_SHOW_MAX = 5;
  return (
    <Layout>
      <Participants>
        {participants.map((user, idx) => {
          return (
            idx < VOTER_SHOW_MAX && (
              <ProfileContainer key={idx} zIndex={idx}>
                <ProfileIconXsOverwrap
                  user={user}
                  isOverlap={
                    idx ===
                    (participants.length > VOTER_SHOW_MAX
                      ? VOTER_SHOW_MAX - 1
                      : undefined)
                  }
                />
              </ProfileContainer>
            )
          );
        })}
      </Participants>
      <MemberCnt>
        <VoteStatus status={voteStatus}>{voteStatus}</VoteStatus>
        {!isMax ? (
          participants.length > 0 && (
            <ParticipantStatus>
              <UserIcon />
              <span>
                <VoterImpact
                  isOverMax={participants.length >= MAX_USER_PER_PLACE}
                >
                  {participants.length}
                </VoterImpact>
                /{maxCnt}
              </span>
            </ParticipantStatus>
          )
        ) : (
          <FullText>({MAX_USER_PER_PLACE}) FULL</FullText>
        )}
      </MemberCnt>
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Participants = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  padding-top: var(--padding--min);
  align-items: end;
`;

const MemberCnt = styled.div`
  display: flex;
  align-items: center;
`;

const VoteStatus = styled.div<{ status: "GOOD" | "FULL" }>`
  margin-right: var(--margin-min);
  display: flex;
  height: 100%;
  align-items: end;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.status === "GOOD" ? "var(--color-mint)" : "var(--color-red)"};
`;

const VoteComplete = styled.span<{ status: "GOOD" | "FULL" }>`
  margin-right: var(--margin-md);
  display: flex;
  height: 100%;
  align-items: end;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.status === "GOOD" ? "var(--color-mint)" : "var(--color-red)"};
`;
const ProfileContainer = styled.div<{ zIndex: number }>`
  width: 23px;
  display: flex;
  z-index: ${(props) => props.zIndex};
  position: relative;
`;

const FullText = styled.span`
  font-size: 14px;
  margin-left: auto;
  color: var(--color-red);
  margin-right: var(--margin-sub);
`;

const ParticipantStatus = styled.div`
  display: flex;
  align-items: center;
  margin-left: var(--margin-md);
  font-size: 14px;
  color: var(--font-h3);
  font-weight: 400;
  > span {
    margin-left: var(--margin-min);
  }
`;
const VoterImpact = styled.b<{ isOverMax: boolean }>`
  font-weight: 400;
  color: ${(props) => (props.isOverMax ? "var(--color-red)" : "inherit")};
`;

export default GatherBlockParticipants;
