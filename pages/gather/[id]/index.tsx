import { Badge, Button } from "@chakra-ui/react";
import {
  faCalendarDays,
  faChevronDown,
  faCrown,
  faDoorOpen,
  faLocationDot,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import dayjs from "dayjs";
import "dayjs/locale/ko"; // 로케일 플러그인 로드
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import Header from "../../../components/layouts/Header";
import ModalPortal from "../../../components/ModalPortal";
import KakaoShareBtn from "../../../components/utils/KakaoShare";
import { WEB_URL } from "../../../constants/system";
import { useGatherContentQuery } from "../../../hooks/gather/queries";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import ApplyParticipationModal from "../../../modals/gather/ApplyParticipationModal";
import ExpireGatherModal from "../../../modals/gather/ExpireGatherModal";
import {
  beforePageState,
  gatherDataState,
  userDataState,
} from "../../../recoil/interactionAtoms";
import { GatherCategoryIcons, GATHER_CATEGORY } from "../../../storage/Gather";
import { IUser } from "../../../types/user";

dayjs.locale("ko"); // 한글로 로케일 설정
function GatherDetail() {
  const router = useRouter();
  const gatherId = router.query.id;

  const [isParticipationModal, setIsParticipationModal] = useState(false);
  const [isExpirationModal, setIsExpirationModal] = useState(false);
  const setBeforePage = useSetRecoilState(beforePageState);

  const { data: user } = useUserInfoQuery();

  const [isSubLocation, setIsSubLocation] = useState(false);
  const [gatherData, setGatherData] = useRecoilState(gatherDataState);
  const [isRefetching, setIsRefetching] = useState(false);

  const onClickParticipation = () => {
    setIsParticipationModal(true);
  };

  const { data: gatherContentArr, refetch } = useGatherContentQuery();
  useEffect(() => {
    if (isRefetching) {
      setTimeout(() => {
        refetch();
      }, 1000);
    }
    if (!gatherData)
      setGatherData(gatherContentArr?.find((item) => item?.id === gatherId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gatherContentArr, gatherData, gatherId, isRefetching]);

  const title = gatherData?.title;
  const date = dayjs(gatherData?.date);
  const myGather = gatherData?.user.uid === user?.uid;
  const gatherOrganizer = gatherData?.user;
  const setUserData = useSetRecoilState(userDataState);
  const onClickProfile = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  const writingDate = dayjs(gatherData?.createdAt).date() - dayjs().date();

  const categoryIcon =
    GatherCategoryIcons[
      GATHER_CATEGORY?.findIndex(
        (item) => item?.title === gatherData?.type.title
      )
    ];
  const isParticipant = gatherData?.participants.some(
    (who) => who?.uid === user?.uid
  );
  console.log(router);
  return (
    <>
      <Header title="" url="/gather">
        <KakaoShareBtn
          title={title}
          subtitle={date.format("M월 DD일(dd)")}
          type="gather"
          url={WEB_URL + router.asPath}
          location={gatherData?.location?.main}
        />
      </Header>
      <Layout>
        <Badge p="4px 6px" my="4px" fontSize="12px" alignSelf="flex-start">
          {categoryIcon}
          <Category>{gatherData?.type.title}</Category>
        </Badge>
        <Profile>
          <ProfileIcon user={gatherData?.user} size="md" />
          <div>
            <span>{gatherData?.user?.name}</span>
            {writingDate === 0 ? (
              <span>오늘</span>
            ) : (
              <span>{writingDate}일 전</span>
            )}
          </div>
        </Profile>
        <Title status={gatherData?.status}>
          <span>
            {gatherData?.status === "pending"
              ? "모집중"
              : gatherData?.status === "open"
              ? "오픈"
              : gatherData?.status === "close"
              ? "취소"
              : null}
          </span>
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
            참여중인 인원 <span>{gatherData?.participants.length + 1}</span>/
            {gatherData?.memberCnt?.max}
          </span>
          <div>
            <MemberItem
              key={gatherOrganizer?.uid}
              onClick={() => onClickProfile(gatherOrganizer)}
            >
              <Organizer>
                <ProfileIcon user={gatherOrganizer} size="md" />
                <CrownWrapper>
                  <FontAwesomeIcon
                    icon={faCrown}
                    color="var(--color-orange)"
                    size="lg"
                  />
                </CrownWrapper>
              </Organizer>
              <div>
                <span>{gatherOrganizer?.name}</span>
                <span>{gatherOrganizer?.comment}</span>
              </div>
            </MemberItem>
            {gatherData?.participants.map((who) => (
              <MemberItem key={who?.uid} onClick={() => onClickProfile(who)}>
                <ProfileIcon user={who} size="md" />
                <div>
                  <span>{who?.name}</span>
                  <span>{who?.comment}</span>
                </div>
              </MemberItem>
            ))}
          </div>
        </Participant>
      </Layout>
      <ButtonNav>
        {gatherData?.status === "open" ? (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            colorScheme="blackAlpha"
            fontSize="15px"
            disabled
          >
            모임장은 단톡방을 만들어주세요!
          </Button>
        ) : gatherData?.status === "close" ? (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            colorScheme="blackAlpha"
            fontSize="15px"
            disabled
          >
            취소된 모임입니다.
          </Button>
        ) : myGather ? (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            backgroundColor="var(--color-mint)"
            color="white"
            fontSize="15px"
            onClick={() => setIsExpirationModal(true)}
          >
            모집종료
          </Button>
        ) : isParticipant ? (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            backgroundColor="var(--color-mint)"
            color="white"
            fontSize="15px"
            onClick={() => setIsExpirationModal(true)}
          >
            참여취소
          </Button>
        ) : (
          <Button
            width="100%"
            height="100%"
            borderRadius="100px"
            backgroundColor="var(--color-mint)"
            color="white"
            fontSize="15px"
            onClick={onClickParticipation}
          >
            참여하기
          </Button>
        )}
      </ButtonNav>
      {isParticipationModal && (
        <ModalPortal setIsModal={setIsParticipationModal}>
          <ApplyParticipationModal
            setIsModal={setIsParticipationModal}
            setIsRefetching={setIsRefetching}
          />
        </ModalPortal>
      )}
      {isExpirationModal && (
        <ModalPortal setIsModal={setIsExpirationModal}>
          <ExpireGatherModal
            setIsModal={setIsExpirationModal}
            setIsRefetching={setIsRefetching}
          />
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
  margin-bottom: 100px;

  > div {
    display: flex;
    align-items: center;
  }
`;

const Organizer = styled.div`
  position: relative;
`;

const CrownWrapper = styled.div`
  position: absolute;
  right: -1px;
  bottom: -1px;
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

const Title = styled.div<{ status: string }>`
  color: var(--font-h1);
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  > span:first-child {
    color: ${(props) =>
      props?.status === "pending"
        ? " var(--color-mint)"
        : props?.status === "open"
        ? "var(--color-red)"
        : "var(--font-h4)"};
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
  margin-bottom: 20px;
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
