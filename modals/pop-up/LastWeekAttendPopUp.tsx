import dayjs from "dayjs";
import styled from "styled-components";
import Skeleton from "../../components/common/masks/skeleton/Skeleton";
import ProfileIcon from "../../components/common/user/Profile/ProfileIcon";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";

import { useUserInfoQuery } from "../../hooks/user/queries";
import { useInteractionLikeQuery } from "../../hooks/user/sub/interaction/queries";
import { useUserAttendRateQuery } from "../../hooks/user/sub/studyRecord/queries";
import PointScoreBar from "../../pagesComponents/point/pointScore/PointScoreBar";

import { IModal } from "../../types/reactTypes";

function LastWeekAttendPopUp({ setIsModal }: IModal) {
  const lastWeekFirstDay = dayjs().day(1).subtract(1, "week").startOf("date");
  const lastWeekLastDay = dayjs().day(0).startOf("date");
  
  const { data: userInfo } = useUserInfoQuery();
  const { data: likeData } = useInteractionLikeQuery();
  const { data: parRate, isLoading } = useUserAttendRateQuery(
    lastWeekFirstDay.subtract(1, "day"),
    lastWeekLastDay.subtract(1, "day"),
    true
  );
 
  const parCnt = parRate?.cnt;
  const rest = userInfo?.role === "resting" && userInfo?.rest;
  const lastWeekLikeCnt = likeData?.filter((like) => {
    const date = dayjs(like.createdAt);
    return lastWeekFirstDay <= date && date <= lastWeekLastDay;
  })?.length;

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader text="지난주 내 기록" />
      <ModalBody>
        <PointScoreBar myScore={userInfo.score} />
        <span>라떼 달성시 20 포인트, 배지 해금!</span>
        <Container>
          {!isLoading ? (
            <Info>
              <Item>
                <span>지난 주 스터디 참여 </span>
                {parCnt || 0} 회<br />
              </Item>
              <Item>
                <span>이번 달 스터디 참여 </span>
                {parCnt || 0} 회<br />
              </Item>
              <div>
                아직 이번 달 스터디 참여 조건을 충족시키지 못했어요 ㅠㅠ
              </div>
              {userInfo.role === "resting" ? (
                <Item>
                  <span>휴식 기간</span>{" "}
                  {rest.type === "일반" ? (
                    <Rest>
                      <span>
                        {dayjs(rest.startDate).format("YY-MM-DD")} ~{" "}
                        {dayjs(rest.endDate).format("YY-MM-DD")}
                      </span>
                      <DDay>
                        D-2
                        {dayjs(rest.endDate).diff(dayjs(), "day")}{" "}
                      </DDay>
                    </Rest>
                  ) : (
                    <Rest>자율참여 멤버</Rest>
                  )}
                </Item>
              ) : (
                <Item>
                  <span>받은 좋아요</span>
                  {lastWeekLikeCnt} 개
                </Item>
              )}
              <Item>
                <span>참여 정산</span>
                12월 1일
              </Item>
              <span>이번 달에 스터디에 참여하지</span>
              1회 참여 필수 !!
            </Info>
          ) : (
            <LayoutSkeleton />
          )}
          <ImageWrapper>
            <ProfileIcon user={userInfo} size="lg" />
          </ImageWrapper>
        </Container>
      </ModalBody>
      <ModalFooterOne onClick={() => setIsModal(false)} />
    </ModalLayout>
  );
}

const LayoutSkeleton = () => (
  <Info>
    <Item>
      <span>역할 구성</span>
      <SkeletonText>
        <Skeleton>temp</Skeleton>
      </SkeletonText>
    </Item>
    <Item>
      <span>스터디 참여 </span>
      <SkeletonText>
        <Skeleton>temp</Skeleton>
      </SkeletonText>
    </Item>
    <Item>
      <span>받은 좋아요</span>
      <SkeletonText>
        <Skeleton>temp</Skeleton>
      </SkeletonText>
    </Item>
    <Item>
      <span>참여 정산</span>
      <SkeletonText>
        <Skeleton>temp</Skeleton>
      </SkeletonText>
    </Item>
  </Info>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SkeletonText = styled.div`
  width: 60px;
`;
const DDay = styled.span`
  color: var(--color-red);
  margin-left: var(--margin-md);
`;
const ImageWrapper = styled.div`
  margin-right: var(--margin-md);
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

const Rest = styled.div``;

const Item = styled.div`
  display: flex;
  > span {
    display: inline-block;
    width: 88px;
    font-weight: 600;
  }
`;

export default LastWeekAttendPopUp;
