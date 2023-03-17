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
          <div>{place?.branch}</div>
        </Status>
        <Info>
          <span>{place?.brand}</span>
          {voted && (
            <div>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>신청완료</span>
            </div>
          )}
        </Info>
        <Participants>
          {attendences?.map((user, idx) => (
            <ProfileContainer key={idx} zIndex={idx}>
              <ProfileImgSm imgSrc={(user.user as IUser).profileImage} />
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
  > div {
    background-color: #ffeae5;
    color: #fd7b5b;
    width: 48px;
    height: 14px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 10px;
    padding: 0px;
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
