import { faCheckCircle, faO, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { IconUserTwo } from "../../../../public/icons/Icons";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import {
  attendCheckState,
  mySpaceFixedState,
  studyStartTimeState,
  voteDateState,
} from "../../../../recoil/studyAtoms";
import {
  useArrivedQuery,
  useStudyStartQuery,
} from "../../../../hooks/vote/queries";
import dayjs, { Dayjs } from "dayjs";
import { VOTE_START_HOUR } from "../../../../constants/system";
import { useEffect, useState } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { IParticipation } from "../../../../types/studyDetails";
import { IUser } from "../../../../types/user";
import ProfileImgSm from "../../../../components/common/ProfileImgSm";

function AboutMainItem({
  studySpaceInfo,
  voted,
}: {
  studySpaceInfo: IParticipation;
  voted: boolean;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const voteDate = useRecoilValue(voteDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const [isCheck, setIsCheck] = useRecoilState(attendCheckState);
  const [studyStartTime, setStudyStartTime] =
    useRecoilState(studyStartTimeState);
  const { attendences, place, status } = studySpaceInfo || {};
  const firstAttendance = attendences?.filter((att) => att.firstChoice);
  const statusFixed = place === mySpaceFixed?.place ? "myOpen" : status;
  const studyDate =
    dayjs().hour() < VOTE_START_HOUR || dayjs().hour() >= 23
      ? voteDate
      : voteDate.subtract(1, "day");
  const { data: studyStart, isLoading } = useStudyStartQuery(voteDate, {
    onSuccess: (data) => {
      data?.length && setStudyStartTime(dayjs(data[0].startTime));
    },
  });

  useArrivedQuery(studyDate, {
    onSuccess(data) {
      if (data.some((att) => att.user.uid === session?.uid)) setIsCheck(true);
    },
  });

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
        <div>
          <Image
            src={`${place?.image}`}
            alt="about"
            width={66}
            height={66}
            unoptimized={true}
          />
        </div>
      </ImageContainer>

      <SpaceInfo>
        <Status>
          <Branch>{place?.branch}</Branch>
          {status !== "pending" && (
            <StatusResult isOpen={Boolean(status === "open")}>
              {status === "open" ? "Open" : "Closed"}
            </StatusResult>
          )}
          {statusFixed === "myOpen" && (
            <Result>
              <FontAwesomeIcon icon={faClock} size="sm" />
              <ResultInfo>{studyStartTime?.format("HH:mm")}</ResultInfo>
            </Result>
          )}
        </Status>
        <Info>
          <span>{place?.brand}</span>
        </Info>

        <Participants status={statusFixed === "myOpen"}>
          <div>
            {voted && statusFixed === "pending" && (
              <VoteComplete>신청완료</VoteComplete>
            )}
          </div>
          <div>
            {firstAttendance?.map((user, idx) => (
              <ProfileContainer key={idx} zIndex={idx}>
                <ProfileImgSm imgSrc={(user?.user as IUser)?.profileImage} />
              </ProfileContainer>
            ))}
            <ParticipantStatus>
              <IconUserTwo />
              <span>
                <b
                  style={{
                    color:
                      firstAttendance.length > 6 ? "var(--color-red)" : null,
                  }}
                >
                  {firstAttendance?.length}
                </b>
                /6
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
  padding: ${(props) => (props.status ? "12px" : "12px")};
  flex-direction: ${(props) => (props.status ? "row-reverse" : null)};
  border: ${(props) => (props.status ? "1.5px solid var(--color-mint)" : null)};
  font-family: "Pretend";
`;

const ImageContainer = styled.div`
  width: 77px;
  height: 77px;
  border: 1px solid var(--font-h5);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 66px;
    height: 66px;
    border-radius: 24%;
    overflow: hidden;
  }
`;

const SpaceInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const VoteComplete = styled.span`
  display: flex;
  height: 100%;
  align-items: end;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-mint);
`;

const Status = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
`;

const Branch = styled.div`
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
  font-family: "PretendExtra";
`;

const StatusResult = styled.div<{ isOpen: boolean }>`
  background-color: ${(props) =>
    props.isOpen ? "#68d3918e" : "var(--font-h6)"};
  color: ${(props) =>
    props.isOpen ? "rgba(34, 84, 61, 0.76)" : "var(--font-h3)"};
  display: inline-block;
  align-items: center;
  height: 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 10px;
  padding: 1px 8px;
  padding: ${(props) => (props.isOpen ? "1px 8px" : "1px 6px")};
  margin-left: 6px;
  margin-right: 4px;
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
`;

const ResultInfo = styled.div`
  margin-left: 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--font-h);
`;

const Check = styled.div`
  width: 54px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  align-self: end;
  > span {
    display: inline-block;
    font-size: 13px;
    color: var(--font-h2);
  }
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
  width: 24px;
  display: flex;
  z-index: ${(props) => props.zIndex};
  position: relative;
`;

const ParticipantStatus = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-bottom: 4px;

  > span {
    font-weight: 400;
    font-size: 12px;
    color: var(--font-h3);
  }
`;

export default AboutMainItem;
