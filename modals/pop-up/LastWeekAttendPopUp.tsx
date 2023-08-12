import dayjs from "dayjs";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { PopUpLayout } from "../../components/common/modal/Modals";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import Skeleton from "../../components/common/skeleton/Skeleton";
import { getRole } from "../../helpers/converterHelpers";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { useUserAttendRateQuery } from "../../hooks/user/studyStatistics/queries";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function LastWeekAttendPopUp({ setIsModal }: IModal) {
  const { data: userInfo } = useUserInfoQuery();

  const { data: parRate, isLoading } = useUserAttendRateQuery(
    dayjs().day(1).subtract(1, "week"),
    dayjs().day(0)
  );

  const parCnt = parRate?.find((who) => who.uid === userInfo.uid)?.cnt;

  const rest = userInfo?.role === "resting" && userInfo?.rest;

  return (
    <>
      <PopUpLayout size="md">
        <ModalHeaderX title="지난주 스터디 기록" setIsModal={setIsModal} />
        <Container>
          {!isLoading ? (
            <Info>
              <Item>
                <span>역할 구성</span>
                {getRole(userInfo.role)}
              </Item>
              <Item>
                <span>스터디 참여 </span>
                {parCnt} 회
              </Item>
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
                  <span>받은 좋아요</span>0 개
                </Item>
              )}
              <Item>
                <span>참여 정산</span>
                9월 1일
              </Item>
            </Info>
          ) : (
            <Info>
              <Item>
                <span>구성</span>
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
                <span>받은 좋아요</span>{" "}
                <SkeletonText>
                  <Skeleton>temp</Skeleton>
                </SkeletonText>
              </Item>
              <Item>
                <span>다음 참여 정산</span>
                <SkeletonText>
                  <Skeleton>temp</Skeleton>
                </SkeletonText>
              </Item>
            </Info>
          )}
          <ImageWrapper>
            <ProfileIcon user={userInfo} size="lg" />
          </ImageWrapper>
        </Container>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>확인</button>
        </ModalFooterNav>
      </PopUpLayout>
    </>
  );
}

const Container = styled(ModalMain)`
  display: flex;
  flex-direction: row;
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
    width: 80px;
    font-weight: 600;
  }
`;

export default LastWeekAttendPopUp;
