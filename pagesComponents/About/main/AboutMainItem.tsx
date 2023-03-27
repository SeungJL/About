import { faCheckCircle, faO, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { IconUserTwo } from "../../../public/icons/Icons";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { mySpaceFixedState, voteDateState } from "../../../recoil/atoms";
import { useArrivedQuery } from "../../../hooks/vote/queries";
import dayjs from "dayjs";
import { VOTE_START_HOUR } from "../../../constants/system";
import { useState } from "react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { IParticipation } from "../../../types/studyDetails";
import { IUser } from "../../../types/user";
import ProfileImgSm from "../../../components/common/ProfileImgSm";

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

  const { attendences, place, status } = studySpaceInfo || {};
  const firstAttendance = attendences?.filter((att) => att.firstChoice);
  const statusFixed = place?._id === mySpaceFixed ? "myOpen" : status;
  const studyDate =
    dayjs().hour() < VOTE_START_HOUR ? voteDate : voteDate.subtract(1, "day");

  const [isCheck, setIsCheck] = useState(false);
  useArrivedQuery(studyDate, {
    onSuccess(data) {
      if (data.some((att) => att.user.uid === session?.uid)) setIsCheck(true);
    },
  });

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
        <Check>
          <span>출석여부: </span>
          <div>
            {isCheck ? (
              <FontAwesomeIcon icon={faO} size="lg" color="var(--color-red)" />
            ) : (
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                color="var(--color-red)"
              />
            )}
          </div>
        </Check>
      )}
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
              <ResultInfo>12시 ~ 21시</ResultInfo>
            </Result>
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
  align-items: center;
  padding: 6px 12px 6px 12px;
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
  padding-top: 4px;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const Status = styled.div`
  text-align: center;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const Branch = styled.div`
  background-color: var(--color-peach);
  color: var(--color-red);
  display: inline-block;
  min-width: 54px;

  height: 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 10px;
  padding: 1px;
  margin-right: 5px;
`;

const StatusResult = styled.div<{ isOpen: boolean }>`
  background-color: ${(props) =>
    props.isOpen ? "#68d3918e" : "var(--font-h6)"};
  color: ${(props) =>
    props.isOpen ? "rgba(34, 84, 61, 0.76)" : "var(--font-h2)"};
  display: inline-block;
  min-width: 48px;
  height: 14px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 10px;
  padding: 0px;
  margin-right: 5px;
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
  width: 68px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  > span {
    display: inline-block;

    font-size: 13px;

    color: var(--font-h1);
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
  > span {
    color: #565b67;

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
