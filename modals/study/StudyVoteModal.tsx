import { useToast } from "@chakra-ui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import PlaceSelector from "../../components/studyVote/placeSelector";
import TimeSelector from "../../components/studyVote/timeSelector";
import { useAttendMutation } from "../../hooks/vote/mutations";
import { VOTE_GET } from "../../libs/queryKeys";
import { hourMinToDate, convertToKr } from "../../libs/utils/dateUtils";
import { AttendDTO } from "../../models/interface/vote";
import { IPlace } from "../../models/place";
import { IParticipation } from "../../models/vote";
import {
  isShowStudyVoteModalState,
  modalContextState,
} from "../../recoil/modalAtoms";
import {
  isVotingState,
  selectPlacesState,
  voteDateState,
} from "../../recoil/voteAtoms";

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

interface IStudyVote {
  participations: IParticipation[];
}

function StudyVoteModal() {
  const [page, setPage] = useState(0);
  const voteDate = useRecoilValue(voteDateState);
  const toast = useToast();
  const setIsShowStudyVote = useSetRecoilState(isShowStudyVoteModalState);
  const queryClient = useQueryClient();
  const modalContext = useRecoilValue(modalContextState);
  const participations = modalContext?.StudyVote.participations;
  const [attendInfo, setAttendInfo] = useState<{
    place: IPlace;
    start: Dayjs;
    end: Dayjs;
    desc: string;
    confirmed: boolean;
    lunch: "attend" | "absent" | "no_select";
    dinner: "attend" | "absent" | "no_select";
    afterDinner: "attend" | "absent" | "no_select";
  }>({
    place: null,
    start: hourMinToDate(12, "00"),
    end: hourMinToDate(18, "00"),
    desc: "",
    confirmed: false,
    lunch: "no_select",
    dinner: "no_select",
    afterDinner: "absent",
  });
  const placeInfo = participations.map((participant) => {
    const placeName = participant.place as IPlace;
    const voteCnt = participant.attendences.length;
    const status = participant.status;

    return { placeName, voteCnt, status };
  });

  const [selectPlaces, setSelectPlaces] = useRecoilState(selectPlacesState);
  const [subPlaces, setSubPlaces] = useState([]);
  const setisVoting = useSetRecoilState(isVotingState);
  const { mutate: patchAttend } = useAttendMutation(voteDate, {
    onSuccess: () => {
      queryClient.invalidateQueries(VOTE_GET);
      setisVoting(true);
    },
    onError: (err) => {},
  });

  const onSubmit = () => {
    const { start, end } = attendInfo;
    setIsShowStudyVote(false);
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

    const attendDTO = {
      place: (attendInfo.place as IPlace)._id,
      subPlace: subPlaces,
      start: start.toDate(),
      end: end.toDate(),
      confirmed: attendInfo.confirmed,
      anonymity: false,
      lunch: attendInfo.lunch,
      dinner: attendInfo.dinner,
      afterDinner: attendInfo.afterDinner,
    } as AttendDTO;

    patchAttend(attendDTO);
  };

  const movePageSeoncd = () => {
    setPage(1);
    setSelectPlaces([]);
  };
  const onSpaceSubmit = () => {
    let selectedPlaces = Array.from(new Set(selectPlaces));
    const subPlaceList = (selectedPlaces as any)?.map((place) => place?._id);
    setSubPlaces(subPlaceList);
    setPage(2);
  };

  const selectedParticipation = participations.find(
    (participation) =>
      (participation.place as IPlace)._id == (attendInfo.place as IPlace)?._id
  );
  return (
    <ModalLayout>
      <ModalHeader>
        <span>{convertToKr(voteDate, "M월 DD일 스터디")} </span>
        <div onClick={() => setIsShowStudyVote(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </ModalHeader>

      {page === 0 ? (
        <SpacePage>
          <span>1지망 선택</span>
          <SpaceSelector>
            <PlaceSelector
              placeInfo={placeInfo}
              selectedPlace={attendInfo.place}
              isSelectUnit={true}
              setSelectedPlace={(place) => {
                setAttendInfo({ ...attendInfo, place });
                movePageSeoncd();
              }}
            />
          </SpaceSelector>
        </SpacePage>
      ) : page === 1 ? (
        <SpacePage>
          <span>2지망 선택(여러개)</span>
          <SpaceSelector>
            <PlaceSelector
              placeInfo={placeInfo}
              selectedPlace={attendInfo.place}
              isSelectUnit={false}
              setSelectedPlace={(place) => {
                setAttendInfo({ ...attendInfo, place });
              }}
            />
          </SpaceSelector>
          <SecondPageNav>
            <button onClick={() => setPage(0)}>뒤로가기</button>
            <button onClick={onSpaceSubmit}>다음</button>
          </SecondPageNav>
        </SpacePage>
      ) : (
        <>
          <TimeSelector
            participation={selectedParticipation}
            start={attendInfo.start}
            setStart={(start: Dayjs) => setAttendInfo({ ...attendInfo, start })}
            end={attendInfo.end}
            setEnd={(end: Dayjs) => setAttendInfo({ ...attendInfo, end })}
          />
          <LastPageNav>
            <button onClick={movePageSeoncd}>뒤로가기</button>
            <button onClick={onSubmit}>제출</button>
          </LastPageNav>
        </>
      )}
    </ModalLayout>
  );
}
export default StudyVoteModal;
