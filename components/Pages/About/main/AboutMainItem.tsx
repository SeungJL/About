import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { IconHOLLYS } from "../../../../public/icons/IconImg";
import { IconCheckCircle, IconUserTwo } from "../../../../public/icons/Icons";
import ProfileImgSm from "../../../common/ProfileImgSm";

function AboutMainItem() {
  const { data: session } = useSession();
  console.log(session);

  const profileArr = [
    session?.user.image,
    session?.user.image,
    session?.user.image,
    session?.user.image,
  ];
  return (
    <Layout>
      <ImageContainer>
        <IconHOLLYS />
      </ImageContainer>
      <SpaceInfo>
        <Status>
          <div>수원역</div>
        </Status>
        <Info>
          <span>할리스</span>
          <div>
            <FontAwesomeIcon icon={faCheck} />
            <span>오픈예정</span>
          </div>
        </Info>
        <Participants>
          {profileArr.map((img, idx) => (
            <ProfileContainer key={idx} zIndex={idx}>
              <ProfileImgSm imgSrc={img} />
            </ProfileContainer>
          ))}
          <ParticipantStatus>
            <IconUserTwo />
            <span>
              <span>4/6</span>
            </span>
          </ParticipantStatus>
        </Participants>
      </SpaceInfo>
    </Layout>
  );
}

const Layout = styled.div`
  height: 110px;
  background-color: white;
  display: flex;
  padding: 16px 24px 16px 16px;
  margin-bottom: 16px;
`;

const ImageContainer = styled.div`
  margin-right: 12px;
`;

const SpaceInfo = styled.div`
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
  margin-left: 10px;
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
