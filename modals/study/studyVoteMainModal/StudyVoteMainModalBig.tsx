import styled from "styled-components";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import PlaceSelectorLg from "../../../components/utils/PlaceSelectorLg";
import TimeSelectorLg from "../../../components/utils/TimeSelectorLg";
import { ModalFooterNav, ModalMain } from "../../../styles/layout/modal";

function StudyVoteMainModalBig({ page, setIsModal }) {
  const voteDate = useRecoilValue(voteDateState);
  return (
    <ModalLayout size="xl">
      <ModalHeaderX
        title={voteDate.format("M월 D일 스터디 투표")}
        setIsModal={setIsModal}
      />
      <ModalMain>
        {page === 0 ? (
          <>
            <Subtitle>1지망 선택</Subtitle>
            <PlaceSelectorLg
              placeInfoArr={placeInfoArr}
              isSelectUnit={true}
              firstPlace={firstPlace}
              setSelectedPlace={setFirstPlace}
            />
          </>
        ) : page === 1 ? (
          <>
            <Subtitle>2지망 선택</Subtitle>
            <PlaceSelectorLg
              placeInfoArr={placeInfoArr}
              isSelectUnit={false}
              firstPlace={firstPlace}
              secondPlaces={secondPlaces}
              setSelectedPlace={setSecondPlaces}
            />
          </>
        ) : (
          <TimeWrapper>
            <span>시간 선택</span>
            <TimeSelectorLg
              setTimes={({ start, end }: ITimeStartToEndHM) => {
                setTime({ start, end });
              }}
              times={time}
            />
          </TimeWrapper>
        )}
      </ModalMain>
      {page === 0 ? (
        <ModalFooterNav>
          <Error>{errorMessage}</Error>
          <button onClick={firstSubmit}>다음</button>
        </ModalFooterNav>
      ) : page === 1 ? (
        <ModalFooterNav>
          <button onClick={() => setPage(0)}>뒤로가기</button>
          <button onClick={() => setPage(2)}>다음</button>
        </ModalFooterNav>
      ) : (
        <ModalFooterNav>
          <button onClick={() => setPage(1)}>뒤로가기</button>
          <button onClick={onSubmit}>완료</button>
        </ModalFooterNav>
      )}
    </ModalLayout>
  );
}

const Layout = styled.div``;
const Subtitle = styled.div`
  color: var(--font-h2);
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const TimeWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  > span {
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 8px;
  }
`;

const Error = styled.span`
  font-size: 13px;
  margin-right: 16px;
  color: var(--color-red);
`;

export default StudyVoteMainModalBig;
