import { faInfinity } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { UserIcon } from "../../../../../components/common/Icon/icons";
import ProfileIconXsOverwrap from "../../../../../components/common/user/Profile/ProfileIconXsOverwrap";
import { MAX_USER_PER_PLACE } from "../../../../../constants/settingValue/study/study";
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

  const isMyVote = participants.find((who) => who.uid === session?.uid);
  const voterCnt = participants.length;

  const voteStatus: "exist" | "FULL" =
    status === "pending"
      ? isMyVote
        ? "exist"
        : voterCnt >= MAX_USER_PER_PLACE
        ? "FULL"
        : null
      : null;

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
        <VoteStatus status={voteStatus}>
          {voteStatus === "exist" && "참여중"}
        </VoteStatus>
        {participants.length > 0 && (
          <ParticipantStatus>
            <UserIcon />
            <span>
              <span>{participants.length}</span>/
              {maxCnt || <FontAwesomeIcon icon={faInfinity} />}
            </span>
          </ParticipantStatus>
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

const VoteStatus = styled.div<{ status: "exist" | "FULL" }>`
  display: flex;
  height: 100%;
  align-items: end;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.status === "exist" ? "var(--color-mint)" : "var(--color-red)"};
`;

const VoteComplete = styled.span<{ status: "exist" | "FULL" }>`
  margin-right: var(--margin-md);
  display: flex;
  height: 100%;
  align-items: end;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.status === "exist" ? "var(--color-mint)" : "var(--color-red)"};
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

export default GatherBlockParticipants;
