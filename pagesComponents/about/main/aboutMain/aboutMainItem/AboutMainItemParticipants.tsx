import { faBlockQuestion } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { UserIcon } from "../../../../../components/common/Icon/icons";
import ProfileIconXsOverwrap from "../../../../../components/common/user/Profile/ProfileIconXsOverwrap";
import { MAX_USER_PER_PLACE } from "../../../../../constants/settingValue/study/study";
import { voteDateState } from "../../../../../recoil/studyAtoms";
import {
  IAttendance,
  StudyStatus,
} from "../../../../../types/study/studyDetail";

interface IAboutMainItemParticipants {
  status: StudyStatus;
  statusFixed: "myOpen" | StudyStatus;
  attendances: IAttendance[];
  isImagePriority: boolean;
}

function AboutMainItemParticipants({
  status,
  statusFixed,
  attendances,
  isImagePriority,
}: IAboutMainItemParticipants) {
  const { data: session } = useSession();

  const voteDate = useRecoilValue(voteDateState);
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

  const filteredAttendances =
    statusFixed === "pending" ? attendances : firstAttendance;

  const isMax = filteredAttendances.length >= MAX_USER_PER_PLACE;

  const hasPublicAccess =
    (status !== "pending" && isMyVote) || voteDate.date() % 10 !== 1;

  const VOTER_SHOW_MAX = status !== "pending" ? 7 : 5;
  return (
    <Layout status={statusFixed === "myOpen"}>
      {/* {statusFixed === "pending" && voteStatus && (
        <VoteComplete status={voteStatus}>{voteStatus}</VoteComplete>
      )} */}
      <Participants>
        {filteredAttendances.map((att, idx) => {
          return (
            idx < VOTER_SHOW_MAX && (
              <ProfileContainer key={idx} zIndex={idx}>
                {status === "open" || hasPublicAccess ? (
                  <ProfileIconXsOverwrap
                    user={att.user}
                    isOverlap={
                      idx ===
                      (filteredAttendances.length > VOTER_SHOW_MAX
                        ? VOTER_SHOW_MAX - 1
                        : undefined)
                    }
                    isImagePriority={isImagePriority}
                  />
                ) : (
                  <FontAwesomeIcon icon={faBlockQuestion} size="xl" />
                )}
              </ProfileContainer>
            )
          );
        })}
      </Participants>
      <MemberCnt>
        <VoteStatus status={voteStatus}>{voteStatus}</VoteStatus>
        {filteredAttendances.length > 0 && (
          <ParticipantStatus>
            <UserIcon />
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
              /{statusFixed === "pending" ? "8" : "8"}
            </span>
          </ParticipantStatus>
        )}
      </MemberCnt>
    </Layout>
  );
}

const Layout = styled.div<{ status: boolean }>`
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

export default AboutMainItemParticipants;
