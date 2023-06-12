import { Badge, Button } from "@chakra-ui/react";
import {
  faCalendarDays,
  faChevronDown,
  faDoorOpen,
  faLocationDot,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import dayjs from "dayjs";
import "dayjs/locale/ko"; // 로케일 플러그인 로드
import { useRouter } from "next/router";
import { useState } from "react";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import Header from "../../../components/layouts/Header";
import ModalPortal from "../../../components/ModalPortal";
import KakaoShareBtn from "../../../components/utils/KakaoShare";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import ApplyParticipationModal from "../../../modals/gather/ApplyParticipationModal";
import { gatherContentState } from "../../../recoil/contentsAtoms";
import {
  beforePageState,
  gatherDataState,
} from "../../../recoil/interactionAtoms";
import { GatherCategoryIcons } from "../../../storage/Gather";

dayjs.locale("ko"); // 한글로 로케일 설정
function GatherDetail() {
  const router = useRouter();

  const data = useRecoilValue(gatherContentState);
  const [isParticipationModal, setIsParticipationModal] = useState(false);
  const setBeforePage = useSetRecoilState(beforePageState);

  const { data: user } = useUserInfoQuery();

  const [isSubLocation, setIsSubLocation] = useState(false);
  const gatherData = useRecoilValue(gatherDataState);
  console.log(gatherData);
  const onClickBtn = () => {
    setIsParticipationModal(true);
  };

  const title = gatherData?.title;
  const date = dayjs(gatherData?.date);

  const onClickProfile = (uid?:string) => {
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <>
      <Header title="" url="/gather">
        <KakaoShareBtn
          title={title}
          subtitle={date.format("M월 DD일(d)")}
          type="gather"
          url=""
        />
      </Header>
      <Layout>
        <Badge p="4px 6px" my="4px" fontSize="12px" alignSelf="flex-start">
          {GatherCategoryIcons[0]}
          <Category>{gatherData?.type.title}</Category>
        </Badge>
        <Profile>
          <ProfileIcon user={user} size="md" />
          <div>
            <span>{user?.name}</span>
            <span>2일 전</span>
          </div>
        </Profile>
        <Title>
          <span>모집중</span>
          <span>{title}</span>
        </Title>
        <LocationMain onClick={() => setIsSubLocation(true)}>
          <div>
            <IconWrapper>
              <FontAwesomeIcon icon={faLocationDot} color="var(--font-h3)" />
            </IconWrapper>
            <span>{gatherData?.location.main}</span>
          </div>
          <FontAwesomeIcon icon={faChevronDown} size="2xs" />
        </LocationMain>
        {isSubLocation && <LocationSub>{gatherData?.location.sub}</LocationSub>}
        <Date>
          <IconWrapper>
            <FontAwesomeIcon icon={faCalendarDays} color="var(--font-h3)" />
          </IconWrapper>
          <span>{date?.format("M.DD(ddd) 오후 h:mm")}</span>
        </Date>
        <Age>
          <IconWrapper>
            <FontAwesomeIcon icon={faUser} color="var(--font-h3)" />
          </IconWrapper>
          <span>
            {gatherData?.age[0]}~{gatherData?.age[1]}세
          </span>
          <FontAwesomeIcon icon={faVenusMars} color="#9E7CFF" />
        </Age>
        <MemberMin>
          <IconWrapper>
            <FontAwesomeIcon icon={faDoorOpen} color="var(--font-h3)" />
          </IconWrapper>
          <span>{gatherData?.memberCnt.min}명 이상 오픈</span>
        </MemberMin>
        <Content>{gatherData?.content}</Content>
        <Participant>
          <span>
            참여중인 인원 <span>4</span>/6
          </span>
          <div>
            <MemberItem onClick={() => onClickProfile()}>
              <ProfileIcon user={user} size="md" />
              <div>
                <span>{user?.name}</span>
                <span>안녕하세요. 잘 부탁드립니다 !</span>
              </div>
            </MemberItem>
          </div>
        </Participant>
      </Layout>
      <ButtonNav>
        <Button
          width="100%"
          height="100%"
          borderRadius="100px"
          backgroundColor="var(--color-mint)"
          color="white"
          fontSize="15px"
          onClick={onClickBtn}
        >
          참여하기
        </Button>
      </ButtonNav>
      {isParticipationModal && (
        <ModalPortal setIsModal={setIsParticipationModal}>
          <ApplyParticipationModal setIsModal={setIsParticipationModal} />
        </ModalPortal>
      )}
    </>
  );
}

const IconWrapper = styled.div`
  width: 16px;
  text-align: center;
`;
const Layout = styled.div`
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    align-items: center;
  }
`;

const Profile = styled.div`
  display: flex;
  margin: 8px 0;
  > div:last-child {
    margin-left: 11px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    align-items: flex-start;
    > span:first-child {
      font-weight: 600;
    }
    > span:last-child {
      font-size: 10px;
      color: var(--font-h3);
    }
  }
`;

const Category = styled.span`
  margin: 0 4px;
`;

const Title = styled.div`
  color: var(--font-h1);
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  > span:first-child {
    color: var(--color-mint);
    margin-right: 8px;
  }
`;

const Location = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LocationMain = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    margin-right: 4px;
    > span {
      margin: 0 6px;
    }
  }
`;

const LocationSub = styled.div`
  color: var(--font-h3);
  font-size: 12px;
  margin-top: 6px;
  margin-left: 20px;
`;

const Date = styled.div`
  margin-top: 8px;

  > span {
    margin-left: 6px;
  }
`;

const Age = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;

  > span {
    margin-left: 6px;
    margin-right: 8px;
  }
`;

const Content = styled.p`
  border-top: 1px solid var(--font-h6);
  border-bottom: 1px solid var(--font-h6);
  margin-top: 16px;
  padding-top: 14px;
  min-height: 100px;
`;

const MemberMin = styled.div`
  margin-top: 8px;
  > span {
    margin-left: 6px;
  }
`;
const Participant = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 20px;
  > span:first-child {
    margin-right: auto;
    font-weight: 700;
    text-align: start;
    > span {
      color: var(--color-mint);
    }
  }
  > div {
    margin-top: 20px;
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const MemberItem = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  > div:last-child {
    display: flex;
    flex-direction: column;
    line-height: 1.6;
    margin-left: 8px;
    > span:first-child {
      font-size: 13px;
      font-weight: 600;
    }
    > span:last-child {
      font-size: 12px;
      color: var(--font-h3);
    }
  }
`;
const ButtonNav = styled.nav`
  width: 100%;
  height: 72px;
  position: fixed;
  bottom: 0;
  padding: 14px;
  left: 0;
`;

export default GatherDetail;
