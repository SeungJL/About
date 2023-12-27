import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { PopOverIcon } from "../../components/common/Icon/PopOverIcon";
import Skeleton from "../../components/common/masks/skeleton/Skeleton";
import ProfileIcon from "../../components/common/user/Profile/ProfileIcon";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { BADGE_INFO } from "../../constants/settingValue/badge";
import { USER_ROLE } from "../../constants/settingValue/role";
import { getUserBadge } from "../../helpers/userHelpers";
import {
  IStudyRecord,
  useAdminStudyRecordQuery,
} from "../../hooks/admin/quries";
import { useUserInfoQuery } from "../../hooks/user/queries";
import PointScoreBar from "../../pagesComponents/point/pointScore/PointScoreBar";
import { locationState } from "../../recoil/userAtoms";

import { IModal } from "../../types/reactTypes";

function LastWeekAttendPopUp({ setIsModal }: IModal) {
  const lastWeekFirstDay = dayjs().day(1).subtract(1, "week").startOf("date");
  const lastWeekLastDay = dayjs().day(0).startOf("date");

  const { data: userInfo } = useUserInfoQuery();
  const location = useRecoilValue(locationState);

  const { data: attendRecord, isLoading } = useAdminStudyRecordQuery(
    dayjs().month() !== lastWeekFirstDay.month()
      ? dayjs().date(1).startOf("date")
      : lastWeekFirstDay,
    lastWeekLastDay,
    undefined,
    userInfo.location,
    userInfo.uid,
    {
      enabled: !!location && !!userInfo.uid,
    }
  );

  const recordValue: IStudyRecord =
    attendRecord && Object.keys(attendRecord).length !== 0
      ? Object.values(attendRecord)[0]
      : { vote: 0, attend: 0, monthAcc: 0 };

  const today = dayjs();
  const firstDayOfMonth = today.startOf("month");
  const differenceInDays = today.diff(firstDayOfMonth, "day");
  const weekNumber = Math.floor(differenceInDays / 7) + 1;

  const { nextBadge } = getUserBadge(userInfo?.score, userInfo?.uid);

  const getBadgePoint = () => {
    for (let i = 0; i < BADGE_INFO.length; i++) {
      const badgeInfo = BADGE_INFO[i];

      if (badgeInfo.badge === nextBadge) {
        return {
          nextBadgePoint: badgeInfo.minScore,
          badgeGap: badgeInfo.minScore - BADGE_INFO[i - 1].minScore,
        };
      }
    }
  };
  const { nextBadgePoint } = getBadgePoint() || {};

  const nextAvatar = {
    10: "병아리",
    30: "고양이",
    50: "토끼",
    70: "호돌",
    90: "거북",
    110: "피그",
    130: "개굴",
    150: "찍찍",
    170: "햄스터",
    190: "냥이",
    210: "햄찌",
    230: "샤크",
  };

  const LayoutSkeleton = () => (
    <Info>
      <Item>
        <span>{weekNumber}주차 스터디 투표</span>

        <SkeletonText>
          <Skeleton>temp</Skeleton>
        </SkeletonText>
      </Item>
      <Item>
        <span>{weekNumber}주차 스터디 출석</span>
        <SkeletonText>
          <Skeleton>temp</Skeleton>
        </SkeletonText>
      </Item>
      <Item>
        <span>이번 달 누적 스터디 참여 </span>
        <SkeletonText>
          <Skeleton>temp</Skeleton>
        </SkeletonText>
      </Item>
      <Item>
        <span>다음 참여 정산일</span>
        <SkeletonText>
          <Skeleton>temp</Skeleton>
        </SkeletonText>
      </Item>
      <Item>
        <span>보유 보증금</span>
        <SkeletonText>
          <Skeleton>temp</Skeleton>
        </SkeletonText>
      </Item>
    </Info>
  );
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xxl">
      <ModalHeader
        isLine={true}
        text={`${dayjs().month() + 1}월 ${weekNumber}주차 주간 체크`}
      />
      <ModalBody>
        <ScoreBarWrapper>
          <PointScoreBar myScore={userInfo.score} hasQuestion={false} />
          {nextBadge ? (
            <span>
              {nextBadge} 달성시 +10 포인트,{" "}
              {nextAvatar[String(nextBadgePoint)]} 아바타 해금!
            </span>
          ) : (
            <span>킹왕짱</span>
          )}
        </ScoreBarWrapper>
        <ProfileWrapper>
          <span>
            {userInfo?.name} ({USER_ROLE?.[userInfo?.role]})
          </span>
          <ImageWrapper>
            <ProfileIcon user={userInfo} size="sm" />
          </ImageWrapper>
        </ProfileWrapper>
        <Container>
          {!isLoading ? (
            <Info>
              <Item>
                <span>{weekNumber}주차 스터디 투표</span>
                <span>{recordValue.vote || 0} 회</span>
              </Item>
              <Item>
                <span>{weekNumber}주차 스터디 출석</span>
                <span>{recordValue.attend} 회</span>
              </Item>
              <Item>
                <div style={{ display: "flex" }}>
                  <span>이번 달 스터디 점수</span>
                  <PopOverIcon
                    title="월간 스터디 점수"
                    text="최소 1점을 넘어야합니다. 출석을 기준으로 정규 스터디는 1회당 1점, 개인, FREE 스터디는 2회당 1점입니다."
                  />
                </div>
                <span>{Math.floor(recordValue.monthAcc) || 0} 점</span>
              </Item>
              <Item>
                <span>다음 참여 정산일</span>
                <span> {dayjs().add(1, "month").month() + 1}월 1일</span>
              </Item>
              <Item>
                <span>보유 보증금</span>
                <span>{userInfo?.deposit}원</span>
              </Item>
            </Info>
          ) : (
            <LayoutSkeleton />
          )}
        </Container>
        <Message>
          {dayjs(userInfo?.registerDate).diff(dayjs(), "month") === 0 ? (
            <div>
              🎉신규 가입을 환영해요🎉
              <br />
              앞으로 열심히 활동해봐요~!
            </div>
          ) : recordValue?.monthAcc < 1 ? (
            <div>
              이번 달에 아직 스터디에 참여하지 않았어요.
              <br /> {-dayjs().add(1, "month").date(1).diff(dayjs(), "day")}일
              뒤에 경고를 받습니다.
            </div>
          ) : (
            <div>p
              🎉잘 하고 있어요🎉
              <br />
              이번주도 열심히 파이팅~!
            </div>
          )}
        </Message>
      </ModalBody>
      <ModalFooterOne onClick={() => setIsModal(false)} isFull={true} />
    </ModalLayout>
  );
}

const Message = styled.div`
  padding: var(--padding-md) var(--padding-sub);
  color: var(--font-h2);
  border-radius: var(--border-radius2);
  background-color: var(--font-h8);
`;

const ProfileWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--border-sub);
  > span:first-child {
    font-weight: 500;
    font-size: 16px;
  }
`;

const ScoreBarWrapper = styled.div`
  padding: var(--padding-md) 0;
  border-bottom: var(--border-sub);
  display: flex;
  flex-direction: column;
  > span {
    font-size: 12px;
    color: var(--font-h3);
    margin-left: auto;
  }
`;

const Container = styled.div`
  padding: var(--padding-sub) 0;
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SkeletonText = styled.div`
  width: 60px;
`;

const ImageWrapper = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  > span {
    display: inline-block;
    margin-top: var(--margin-min);
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: var(--padding-min) 0;
  > span:last-child {
    font-weight: 600;
  }
`;

export default LastWeekAttendPopUp;
