import { useToast } from "@chakra-ui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import PlaceSelector, { IplaceInfo } from "./placeSelector";
import TimeSelector from "./timeSelector";
import { useAttendMutation } from "../../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../../libs/queryKeys";
import { hourMinToDate } from "../../../../libs/utils/dateUtils";
import { IVoteStudyInfo } from "../../../../types/study";
import { IPlace } from "../../../../models/place";
import { IParticipation } from "../../../../models/vote";
import {
  isShowStudyVoteModalState,
  modalContextState,
} from "../../../../recoil/modalAtoms";
import { isVotingState, voteDateState } from "../../../../recoil/studyAtoms";
import ModalPortal from "../../../../components/ModalPortal";
import { ITimeStartToEnd } from "../../../../types/utils";

function VoteStudyModal({
  setIsShowModal,
  participations,
}: {
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
  participations: IParticipation[];
}) {
  const [page, setPage] = useState(0);
  const voteDate = useRecoilValue(voteDateState);
  const toast = useToast();
  const queryClient = useQueryClient();

  const placeInfoArr = participations.map((participant) => {
    const placeName = participant.place;
    const voteCnt = participant.attendences.length;
    const status = participant.status;

    return { placeName, voteCnt, status };
  });

  const [firstPlace, setFirstPlace] = useState<IplaceInfo[]>([]);
  const [secondPlaces, setSecondPlaces] = useState<IplaceInfo[]>([]);
  const [time, setTime] = useState<ITimeStartToEnd>({
    start: { hour: 12, minutes: 0 },
    end: { hour: 18, minutes: 0 },
  });

  const setisVoting = useSetRecoilState(isVotingState);
  const { mutate: patchAttend } = useAttendMutation(voteDate, {
    onSuccess: () => {
      queryClient.invalidateQueries(VOTE_GET);
      setisVoting(true);
    },
  });
  const [voteInfo, setvoteInfo] = useState<IVoteStudyInfo>({
    place: null,
    subPlace: null,
    start: { hour: 12, minutes: 0 },
    end: { hour: 18, minutes: 0 },
  });
  const onSubmit = () => {
    const { start, end } = voteInfo;
    setIsShowModal(false);
    if (start >= end) {
      toast({
        title: "잘못된 입력",
        description: "시작시간은 끝시간 이전이여야 합니다",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    patchAttend(voteInfo);
  };

  return (
    <>
      <ModalLayout>
        <ModalHeader>
          <span>{voteDate.format("M월 DD일 스터디")}</span>
          <div onClick={() => setIsShowModal(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </ModalHeader>

        {page === 0 ? (
          <SpacePage>
            <span>1지망 선택</span>
            <PlaceSelector
              placeInfoArr={placeInfoArr}
              isSelectUnit={true}
              setSelectedPlace={(place) => {
                setFirstPlace([...firstPlace, place]);
                setPage(1);
              }}
            />
          </SpacePage>
        ) : page === 1 ? (
          <SpacePage>
            <span>2지망 선택(여러개)</span>
            <PlaceSelector
              placeInfoArr={placeInfoArr}
              isSelectUnit={false}
              firstPlace={firstPlace}
              secondPlaces={secondPlaces}
              setSelectedPlace={(place) => {
                setSecondPlaces([...secondPlaces, place]);
              }}
            />
            <SecondPageNav>
              <button onClick={() => setPage(0)}>뒤로가기</button>
              <button onClick={() => setPage(2)}>다음</button>
            </SecondPageNav>
          </SpacePage>
        ) : (
          <>
            <TimeSelector
              setTimes={({ start, end }: ITimeStartToEnd) =>
                setTime({ ...time, start, end })
              }
              times={time}
            />
            <LastPageNav>
              <button onClick={() => setPage(1)}>뒤로가기</button>
              <button onClick={onSubmit}>제출</button>
            </LastPageNav>
          </>
        )}
      </ModalLayout>
    </>
  );
}
export default VoteStudyModal;

const ModalLayout = styled.div`
  width: 320px;
  height: 220px;
  position: absolute;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  background-color: white;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const SpaceSelector = styled.div`
  margin-top: 10px;
`;
const SpacePage = styled.div`
  > span {
    color: brown;
  }
`;

const SecondPageNav = styled.nav`
  text-align: end;
  margin-top: 10px;
  > button {
    width: 60px;
    font-size: 0.8em;
    background-color: brown;
    color: white;
    margin-left: 10px;
    border-radius: 10px;
    padding: 3px;
  }
`;
const LastPageNav = styled.nav`
  margin-top: 37px;
  text-align: end;
  > button {
    width: 60px;
    font-size: 0.8em;
    background-color: brown;
    color: white;
    margin-left: 10px;
    border-radius: 10px;
    padding: 3px;
  }
`;
