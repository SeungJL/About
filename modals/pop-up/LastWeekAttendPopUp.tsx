import dayjs from "dayjs";
import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/common/modal/ModalComponents";
import { PopUpLayout } from "../../components/common/modal/Modals";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import Skeleton from "../../components/common/skeleton/Skeleton";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { useUserParticipationRateQuery } from "../../hooks/user/studyStatistics/queries";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/common";

function LastWeekAttendPopUp({ setIsModal }: IModal) {
  const { data: userInfo } = useUserInfoQuery();

  const { data: parRate, isLoading } = useUserParticipationRateQuery(
    dayjs().day(1).subtract(1, "week"),
    dayjs().day(0)
  );

  const parCnt = parRate?.find((who) => who.uid === userInfo.uid)?.cnt;

  return (
    <>
      <PopUpLayout size="md">
        <ModalHeaderXLine title="지난주 스터디 기록" setIsModal={setIsModal} />
        <Container>
          {!isLoading ? (
            <Info>
              <Item>
                <span>구성</span>
                수습 회원
              </Item>
              <Item>
                <span>스터디 참여 </span>
                {parCnt} 회
              </Item>
              <Item>
                <span>받은 좋아요</span>0 개
              </Item>
              <Item>
                <span>다음 참여 정산</span>
                8월 1일
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
            <span>{userInfo.name}</span>
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

const ImageWrapper = styled.div`
  margin-right: var(--margin-main);
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
  > span {
    display: inline-block;
    width: 100px;
    font-weight: 600;
  }
`;

export default LastWeekAttendPopUp;
