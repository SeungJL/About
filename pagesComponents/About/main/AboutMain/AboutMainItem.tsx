import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { IconUserTwo } from "../../../../public/icons/Icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import ProfileIconSm from "../../../../components/common/Profile/ProfileIconSm";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  mySpaceFixedState,
  studyStartTimeState,
  voteDateState,
} from "../../../../recoil/studyAtoms";

import { IParticipation } from "../../../../types/studyDetails";
import { IUser } from "../../../../types/user";
import { useStudyStartQuery } from "../../../../hooks/vote/queries";
import { Badge } from "@chakra-ui/react";
import { LogoAdjustmentImage } from "../../../../components/ui/DesignAdjustment";
import { MAX_USER_PER_PLACE } from "../../../../constants/study";

const VOTER_SHOW_MAX = 7;

function AboutMainItem({
  studySpaceInfo,
  voted,
}: {
  studySpaceInfo: IParticipation;
  voted: boolean;
}) {
  const router = useRouter();

  const voteDate = useRecoilValue(voteDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const [studyStartTime, setStudyStartTime] =
    useRecoilState(studyStartTimeState);

  const { attendences, place, status } = studySpaceInfo || {};
  const statusFixed = place === mySpaceFixed?.place ? "myOpen" : status;
  const firstAttendance = attendences?.filter((att) => att.firstChoice);

  const voterCnt = attendences.length;
  const voteStatus: "GOOD" | "FULL" =
    status === "pending"
      ? voted
        ? "GOOD"
        : voterCnt >= MAX_USER_PER_PLACE
        ? "FULL"
        : null
      : null;

  return (
    <Layout
      status={statusFixed === "myOpen"}
      onClick={() =>
        router.push(
          `/about/${voteDate.format("YYYY-MM-DD")}/${studySpaceInfo.place._id}`
        )
      }
    >
      <ImageContainer>
        <LogoAdjustmentImage place={place} />
      </ImageContainer>

      <SpaceInfo>
        <Status>
          <Branch>{place?.branch}</Branch>
          {status !== "pending" && status === "open" ? (
            <Badge colorScheme="green" ml="8px">
              Open
            </Badge>
          ) : status !== "pending" && status === "dismissed" ? (
            <Badge colorScheme="blackAlpha" ml="8px">
              Closed
            </Badge>
          ) : null}
          {statusFixed === "myOpen" && (
            <Result>
              <FontAwesomeIcon icon={faClock} size="sm" />
              <ResultInfo>{studyStartTime?.format("HH:mm")} ~</ResultInfo>
            </Result>
          )}
        </Status>
        <Info>
          <span>{place?.brand}</span>
        </Info>

        <Participants status={statusFixed === "myOpen"}>
          <div>
            {statusFixed === "pending" && (
              <VoteComplete status={voteStatus}>{voteStatus}</VoteComplete>
            )}
          </div>
          <div>
            {statusFixed === "pending"
              ? attendences?.map(
                  (user, idx) =>
                    idx < VOTER_SHOW_MAX && (
                      <ProfileContainer key={idx} zIndex={idx}>
                        <ProfileIconSm
                          user={user?.user as IUser}
                          isOverlap={idx === VOTER_SHOW_MAX - 1}
                        />
                      </ProfileContainer>
                    )
                )
              : firstAttendance?.map(
                  (user, idx) =>
                    idx < VOTER_SHOW_MAX + 1 && (
                      <ProfileContainer key={idx} zIndex={idx}>
                        <ProfileIconSm
                          user={user?.user as IUser}
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
                    attendences?.length >= MAX_USER_PER_PLACE
                  }
                >
                  {statusFixed === "pending"
                    ? attendences.length
                    : firstAttendance?.length}
                </VoterImpact>
                /8
              </span>
            </ParticipantStatus>
          </div>
        </Participants>
      </SpaceInfo>
    </Layout>
  );
}

const Layout = styled.div<{ status: boolean }>`
  height: 100px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: ${(props) => (props.status ? "12px 12px 12px 0px" : "12px")};
  flex-direction: ${(props) => (props.status ? "row-reverse" : null)};
  border: ${(props) => (props.status ? "1.5px solid var(--color-mint)" : null)};
`;

const ImageContainer = styled.div`
  width: 77px;
  height: 77px;
  border: 1px solid var(--font-h5);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SpaceInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
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

const Status = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
`;

const Branch = styled.div`
  display: inline-block;
  font-weight: 800;
  font-size: 16px;
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const ResultInfo = styled.div`
  margin-left: 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--font-h);
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    color: var(--font-h3);
    font-size: 12px;
  }
  > div {
    display: flex;
    align-items: center;
    color: #565b67;
    font-size: 12px;
    > span {
      margin-left: 3px;
    }
  }
`;
const Participants = styled.div<{ status: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.status ? "row-reverse" : null)};
  > div:last-child {
    display: flex;
    padding-top: 4px;
    align-items: end;
  }
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
  margin-left: 10px;
  margin-bottom: 4px;

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

export default AboutMainItem;
