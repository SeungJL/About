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
import { studySpaceFixedState } from "../../../../recoil/studyAtoms";

function AboutMainItem({
  studySpaceInfo,
  voted,
}: {
  studySpaceInfo: IParticipation;
  voted: boolean;
}) {
  const { data: session } = useSession();
  const attendences = studySpaceInfo?.attendences;
  const place = studySpaceInfo?.place;
  const status = studySpaceInfo?.status;
  const studySpaceFixed = useRecoilValue(studySpaceFixedState);
  const statusFixed =
    status === "pending"
      ? "pending"
      : status === "dismissed"
      ? "dismissed"
      : place._id === studySpaceFixed
      ? "myOpen"
      : "otherOpen";

  return (
    <Layout layout status={statusFixed}>
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
            <span>
              시작 시간: <span> 13시</span>
            </span>
            <br />
            <span>
              종료 시간: <span> 19시</span>
            </span>
          </ResultInfo>
          <Check>
            출석 여부: <span>미 출석</span>
          </Check>
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
          {attendences?.map((user, idx) => (
            <ProfileContainer key={idx} zIndex={idx}>
              <ProfileImgSm imgSrc={(user?.user as IUser)?.profileImage} />
            </ProfileContainer>
          ))}
          <ParticipantStatus>
            <IconUserTwo />
            <span>
              <span>{attendences?.length}/6</span>
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
  padding: 10px 24px 10px 16px;
  margin-bottom: 10px;
  flex-direction: ${(props) =>
    props.status === "myOpen" ? "row-reverse" : null};
  border: ${(props) =>
    props.status === "myOpen" ? "1px solid #00C2B3" : null};
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
  background-color: #ffeae5;
  color: #fd7b5b;
`;

const StatusResult = styled.div<{ isOpen: boolean }>`
  background-color: ${(props) => (props.isOpen ? "#68d3918e" : "#d3d3d3d8")};
  color: ${(props) =>
    props.isOpen ? "rgba(34, 84, 61, 0.76)" : "rgb(0,0,0,0.7)"};
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ResultInfo = styled.div`
  text-align: center;
  width: 80px;
  height: 36px;
  border-radius: 10px;

  background-color: #f0f2f5;
  padding: 2px;
  font-size: 11px;
  color: #565b67;
  > span {
    > span {
      font-weight: 600;
    }
  }
`;

const Check = styled.span`
  align-self: flex-end;
  margin-right: 6px;
  font-size: 11px;
  color: #565b67;
  > span {
    font-weight: 600;
  }
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
