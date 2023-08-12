import { useSession } from "next-auth/react";
import styled from "styled-components";
import ProfileIconXsOverwrap from "../../../../../components/common/Profile/ProfileIconXsOverwrap";
import { MAX_USER_PER_PLACE } from "../../../../../constants/study";
import { IconUserTwo } from "../../../../../public/icons/Icons";
import { IAttendance, StudyStatus } from "../../../../../types/study/study";

interface IAboutMainItemParticipants {
  status: StudyStatus;
  statusFixed: "myOpen" | StudyStatus;
  attendances: IAttendance[];
}
const VOTER_SHOW_MAX = 7;
function AboutMainItemParticipants({
  status,
  statusFixed,
  attendances,
}: IAboutMainItemParticipants) {
  const { data: session } = useSession();
 
  const isMyVote = attendances.find((who) => who.user?.uid === session?.uid);
  const voterCnt = attendances.length;
  const voteStatus: "GOOD" | "FULL" =
    status === "pending"
      ? isMyVote
        ? "GOOD"
        : voterCnt >= MAX_USER_PER_PLACE
        ? "FULL"
        : null
      : null;
  const firstAttendance = attendances.filter((att) => att.firstChoice);
  return (
    <Layout status={statusFixed === "myOpen"}>
      <div>
        {statusFixed === "pending" && (
          <VoteComplete status={voteStatus}>{voteStatus}</VoteComplete>
        )}
      </div>
      <div>
        {statusFixed === "pending"
          ? attendances.map(
              (att, idx) =>
                idx < VOTER_SHOW_MAX && (
                  <ProfileContainer key={idx} zIndex={idx}>
                    <ProfileIconXsOverwrap
                      user={att.user}
                      isOverlap={idx === VOTER_SHOW_MAX - 1}
                    />
                  </ProfileContainer>
                )
            )
          : firstAttendance.map(
              (att, idx) =>
                idx < VOTER_SHOW_MAX + 1 && (
                  <ProfileContainer key={idx} zIndex={idx}>
                    <ProfileIconXsOverwrap
                      user={att.user}
                      isOverlap={idx === VOTER_SHOW_MAX}
                    />
                  </ProfileContainer>
                )
            )}
        <ParticipantStatus>
          <IconUserTwo />
          <span>
            <VoterImpact
              isOverMax={
                statusFixed === "pending" &&
                attendances.length >= MAX_USER_PER_PLACE
              }
            >
              {statusFixed === "pending"
                ? attendances.length
                : firstAttendance.length}
            </VoterImpact>
            /{statusFixed === "pending" ? "8" : "10"}
          </span>
        </ParticipantStatus>
      </div>
    </Layout>
  );
}

const Layout = styled.div<{ status: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => props.status && "row-reverse"};
  > div:last-child {
    display: flex;
    padding-top: var(--padding--min);
    align-items: end;
  }
`;
const VoteComplete = styled.span<{ status: "GOOD" | "FULL" }>`
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

const ParticipantStatus = styled.div`
  display: flex;
  align-items: center;
  margin-left: var(--margin-md);
  margin-bottom: var(--margin-min);
  > span {
    font-weight: 400;
    font-size: 12px;
    color: var(--font-h3);
  }
`;
const VoterImpact = styled.b<{ isOverMax: boolean }>`
  color: ${(props) =>
    props.isOverMax ? "var(--color-red)" : "var(--font-h2)"};
`;

export default AboutMainItemParticipants;
