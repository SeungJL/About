import { Badge, Button } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import Header from "../../../components/layout/Header";
import PageSlide from "../../../components/layout/PageSlide";
import { BADGE_COLOR } from "../../../constants/settingValue/badge";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { getUserBadge } from "../../../helpers/userHelpers";
import { useStudyArrivedCntQuery } from "../../../hooks/study/queries";
import PointScoreBar from "../../../pageTemplates/point/pointScore/PointScoreBar";
import {
  isProfileEditState,
  prevPageUrlState,
} from "../../../recoil/previousAtoms";
import { userInfoState } from "../../../recoil/userAtoms";

function UserProfile() {
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
  const { badge } = getUserBadge(userInfo?.score, userInfo?.uid);

  const setPrevPageUrl = useSetRecoilState(prevPageUrlState);
  const setIsProfileEdit = useSetRecoilState(isProfileEditState);

  const { data: myArrivedCnt, isLoading } = useStudyArrivedCntQuery(
    userInfo?.uid as string
  );

  const onClickProfile = () => {
    setIsProfileEdit(true);
    setPrevPageUrl("/user/profile");
    router.push("/register/location");
  };

  return (
    <PageSlide>
      <Header title="내 프로필" url="/user" />
      <UserOverview>
        <div>
          <ProfileIcon user={userInfo} size="lg" />
          <Name>
            <span>{userInfo?.name}</span>
            <Badge colorScheme={BADGE_COLOR[badge]}>{badge}</Badge>
          </Name>
        </div>
        <Button w="100%" onClick={onClickProfile}>
          프로필 수정
        </Button>
      </UserOverview>
      <Score>
        <PointScoreBar myScore={userInfo?.score} />
      </Score>
      <Detail>
        <li>
          <span>내 가입일:</span>
          {dayjsToFormat(dayjs(userInfo?.registerDate), "YYYY년 M월 D일")}
        </li>
        <li>
          <span>내 스터디 누적 참여 횟수:</span>
          {myArrivedCnt}회
        </li>
      </Detail>
      <Info>
        <BlockItem onClick={() => router.push("/user/profile/depositLog")}>
          <span>
            내 보증금 <b>{userInfo?.deposit}</b>원
          </span>
          <FontAwesomeIcon icon={faChevronRight} />
        </BlockItem>
        <BlockItem onClick={() => router.push("/user/profile/friend")}>
          <span>
            내 친구 <b>{userInfo?.friend?.length}</b>명
          </span>
          <FontAwesomeIcon icon={faChevronRight} />
        </BlockItem>
        <BlockItem onClick={() => router.push("/user/profile/like")}>
          <span>
            받은 좋아요 <b>7</b>개
          </span>
          <FontAwesomeIcon icon={faChevronRight} />
        </BlockItem>
      </Info>
    </PageSlide>
  );
}

const UserOverview = styled.div`
  margin: 0 var(--gap-4);
  > div {
    padding: var(--gap-4) 0;
    display: flex;
    align-items: center;
  }
`;

const Name = styled.div`
  font-weight: 600;
  margin-left: var(--gap-3);
  > span:first-child {
    margin-right: var(--gap-1);
  }
`;

const Score = styled.div`
  margin-top: var(--gap-2);
  padding: var(--gap-4);
`;

const Detail = styled.ul`
  padding: var(--gap-4);
  background-color: var(--gray-7);
  font-size: 12px;
  > li {
    margin-left: var(--gap-2);
    color: var(--gray-2);
    > span:first-child {
      margin-right: var(--gap-1);
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlockItem = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--gap-4);
  border-bottom: var(--border);
  font-weight: 700;
  > span:first-child {
    > b {
      color: var(--color-mint);
    }
  }
`;

export default UserProfile;
