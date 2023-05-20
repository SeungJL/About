import { Badge, Button } from "@chakra-ui/react";
import {
  faArrowDown,
  faCalendar,
  faCalendarDays,
  faChevronDown,
  faDoorOpen,
  faEllipsis,
  faEllipsisVertical,
  faLocationDot,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProfileIconMd from "../../../components/common/Profile/ProfileIconMd";
import ProfileIconSm from "../../../components/common/Profile/ProfileIconSm";
import Header from "../../../components/layouts/Header";
import KakaoShareBtn from "../../../components/utils/KakaoShare";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import { gatherContentState } from "../../../recoil/contentsAtoms";
import { GatherCategoryIcons } from "../../../storage/Gather";
import { useRouter } from "next/router";

function GatherDetail() {
  const router = useRouter();
  const data = useRecoilValue(gatherContentState);
  const { data: user } = useUserInfoQuery();

  const onClickBtn = () => {};
  return (
    <>
      <Header title="">
        <KakaoShareBtn />
        <div>
          <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
        </div>
      </Header>
      <Layout>
        <Badge p="4px 6px" my="4px" fontSize="12px" alignSelf="flex-start">
          {GatherCategoryIcons[0]}
          <Category>보드게임</Category>
        </Badge>
        <Profile>
          <ProfileIconSm user={user} />
          <div>
            <span>{user?.name}</span>
            <span>2일 전</span>
          </div>
        </Profile>
        <Title>
          <span>모집중</span>
          <span>보드게임 하러 가실 분</span>
        </Title>
        <Location>
          <div>
            <IconWrapper>
              <FontAwesomeIcon icon={faLocationDot} color="var(--font-h3)" />
            </IconWrapper>
            <span>아주대학교</span>
          </div>
          <FontAwesomeIcon icon={faChevronDown} size="2xs" />
        </Location>
        <Date>
          <IconWrapper>
            <FontAwesomeIcon icon={faCalendarDays} color="var(--font-h3)" />
          </IconWrapper>
          <span>5.28(금) 오후 6:00</span>
        </Date>
        <Age>
          <IconWrapper>
            <FontAwesomeIcon icon={faUser} color="var(--font-h3)" />
          </IconWrapper>
          <span>23~28세</span>
          <FontAwesomeIcon icon={faVenusMars} color="#9E7CFF" />
        </Age>
        <MemberMin>
          <IconWrapper>
            <FontAwesomeIcon icon={faDoorOpen} color="var(--font-h3)" />
          </IconWrapper>
          <span>4명 이상 오픈</span>
        </MemberMin>
        <Content>재미있는 보드게임 하실 분들을 모집해요~!</Content>
        <Participant>
          <span>
            참여중인 인원 <span>4</span>/6
          </span>
          <div>
            <MemberItem onClick={() => router.push(`/profile/${user.uid}`)}>
              <ProfileIconSm user={user} />
              <div>
                <span>{user?.name}</span>
                <span>안녕하세요. 잘 부탁드립니다 !</span>
              </div>
            </MemberItem>
            <MemberItem>
              <ProfileIconSm user={user} />
              <div>
                <span>{user?.name}</span>
                <span>안녕하세요. 잘 부탁드립니다 !</span>
              </div>
            </MemberItem>
            <MemberItem>
              <ProfileIconSm user={user} />
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

const Content = styled.div`
  margin-top: 20px;
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

  margin-top: 32px;
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
