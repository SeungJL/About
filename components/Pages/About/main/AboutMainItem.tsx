import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { IParticipation } from "../../../../models/vote";
import { IconHOLLYS } from "../../../../public/icons/IconImg";
import { IconUserTwo } from "../../../../public/icons/Icons";
import ProfileImgSm from "../../../common/ProfileImgSm";
import Image from "next/image";
import { IUser } from "../../../../models/user";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useRouter } from "next/router";
import { mySpaceFixedState, voteDateState } from "../../../../recoil/atoms";
import { useArrivedQuery } from "../../../../hooks/vote/queries";
import dayjs from "dayjs";
import { VOTE_START_HOUR } from "../../../../constants/system";
import { useState } from "react";

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

  const attendences = studySpaceInfo?.attendences;
  const place = studySpaceInfo?.place;
  const status = studySpaceInfo?.status;
  const firstAttendance = attendences?.filter((att) => att.firstChoice);

  const statusFixed = place?._id === mySpaceFixed ? "myOpen" : status;

  const studyDate =
    dayjs().hour() < VOTE_START_HOUR ? voteDate : voteDate.subtract(1, "day");

  const { data: attendCheck, isLoading } = useArrivedQuery(studyDate);

  const [isCheck, setIsCheck] = useState(false);
  if (!isLoading) {
    if (attendCheck.some((att) => att.user.uid === session?.uid))
      setIsCheck(true);
  }
  return (
    <Layout
      layout
      status={statusFixed}
      onClick={() =>
        router.push(
          `/about/${voteDate.format("YYYY-MM-DD")}/${studySpaceInfo.place._id}`
        )
      }
    >
      {statusFixed !== "myOpen" ? (
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
      ) : (
        <Result>
          <ResultInfo>
            오픈: <b>12시 ~ 21시</b>
            <Check>
              상태: <b>{isCheck ? "출석 완료" : "미 출석"}</b>
            </Check>
          </ResultInfo>
        </Result>
      )}
      <SpaceInfo>
        <Status>
          <Branch>{place?.branch}</Branch>
          {status !== "pending" && (
            <StatusResult isOpen={Boolean(status === "open")}>
              {status === "open" ? "Open" : "Closed"}
            </StatusResult>
          )}
        </Status>
        <Info>
          <span>{place?.brand}</span>
          {voted && statusFixed === "pending" && (
            <div>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>신청완료</span>
            </div>
          )}
        </Info>

        <Participants>
          {firstAttendance?.map((user, idx) => (
            <ProfileContainer key={idx} zIndex={idx}>
              <ProfileImgSm imgSrc={(user?.user as IUser)?.profileImage} />
            </ProfileContainer>
          ))}
          <ParticipantStatus>
            <IconUserTwo />
            <span>
              <span>{firstAttendance?.length}/6</span>
            </span>
          </ParticipantStatus>
        </Participants>
      </SpaceInfo>
    </Layout>
  );
}

const Layout = styled(motion.div)<{ status: string }>`
  height: 100px;
  background-color: white;
  display: flex;
  padding: 10px 12px 10px 12px;
  margin-bottom: 10px;
  flex-direction: ${(props) =>
    props.status === "myOpen" ? "row-reverse" : null};
  border: ${(props) =>
    props.status === "myOpen" ? "1.5px solid var(--color-mint)" : null};
`;

const ImageContainer = styled.div`
  width: 77px;
  height: 77px;
  border: 1px solid #f0f2f5;

  border-radius: 24%;
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
  flex: 1;
`;

const Status = styled.div`
  text-align: center;
  margin-bottom: 5px;
  display: flex;
  > div {
    width: 48px;
    height: 14px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 10px;
    padding: 0px;
    margin-right: 5px;
  }
`;
const Branch = styled.div`
  background-color: var(--color-peach);
  color: var(--color-red);
`;

const StatusResult = styled.div<{ isOpen: boolean }>`
  background-color: ${(props) =>
    props.isOpen ? "#68d3918e" : "var(--font-h6)"};
  color: ${(props) =>
    props.isOpen ? "rgba(34, 84, 61, 0.76)" : "var(--font-h2)"};
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultInfo = styled.div`
  width: 90px;
  padding: 2px;
  font-size: 10px;
  color: var(--font-h);
  padding-left: 7px;
  background-color: var(--font-h7);
`;

const Check = styled.span`
  display: inline-block;
  margin-top: 3px;
  align-self: flex-end;
  color: var(--font-h2);
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    color: #565b67;
    font-family: "PretendardSemiBold";
    font-weight: 600;
    font-size: 16px;
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
const Participants = styled.div`
  flex: 1;
  display: flex;
`;
const ProfileContainer = styled.div<{ zIndex: number }>`
  width: 22px;
  display: flex;
  align-items: end;
  z-index: ${(props) => props.zIndex};
  position: relative;
`;

const ParticipantStatus = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-left: 11px;
  > span {
    font-weight: 400;
    font-size: 13px;
    margin-left: 2px;
    color: #767d8a;
    > span {
      font-weight: 600;
    }
  }
`;

export default AboutMainItem;
