import { useToast } from "@chakra-ui/react";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dayjs } from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Map from "../components/map";
import PlaceSelector from "../components/voteModal/placeSelector";
import { MAX_USER_PER_PLACE } from "../constants/system";
import { useAttendMutation } from "../hooks/vote/mutations";
import { VOTE_GET } from "../libs/queryKeys";
import {
  getToday,
  getNextDate,
  getTomorrow,
  hourMinToDate,
} from "../libs/utils/dateUtils";
import { AttendDTO } from "../models/interface/vote";
import { IPlace } from "../models/place";
import { IParticipation } from "../models/vote";
import { isShowStudyVoteModalState, selectPlacesState } from "../recoil/atoms";

const ModalLayout = styled.div`
  width: 340px;
  height: 440px;
  position: absolute;
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
  margin-bottom: 10px;
`;
const SpaceMap = styled.div`
  margin-bottom: 10px;
`;
const SpaceSelector = styled.div`
  margin-top: 10px;
`;
const SpacePage = styled.div``;

const SecondPageNav = styled.nav`
  text-align: end;
  > button {
    width: 70px;
    background-color: brown;
    color: white;
    margin-left: 10px;
    border-radius: 10px;
    padding: 5px;
    font-size: 0.9em;
  }
`;

interface IStudyVote {
  participations: IParticipation[];
  isLate?: boolean;
  date: Dayjs;
}
function StudyVoteModal({ participations, isLate, date }: IStudyVote) {
  const [page, setPage] = useState(0);
  const toast = useToast();
  const setIsShowStudyVote = useSetRecoilState(isShowStudyVoteModalState);
  const queryClient = useQueryClient();
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
  const placeVoteInfo = participations.map((participant) => {
    const place = participant.place as IPlace;
    const vote = participant.attendences.length;
    const status = participant.status;

    return { place, vote, status };
  });

  const places = placeVoteInfo.map((pv) => pv.place);
  const selectPlaces = useRecoilValue(selectPlacesState);
  const { mutate: patchAttend } = useAttendMutation(date, {
    onSuccess: () => {
      queryClient.invalidateQueries(VOTE_GET);
    },
    onError: (err) => {},
  });
  const onSubmit = () => {
    const { start, end } = attendInfo;
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
  const onSpaceSubmit = () => {
    selectPlaces.map((place) => {
      setAttendInfo({ ...attendInfo, place });
    });
    setPage(2);
    onSubmit();
  };
  return (
    <ModalLayout>
      <ModalHeader>
        <span>{date.format("M월 DD일 스터디")}</span>
        <div onClick={() => setIsShowStudyVote(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </ModalHeader>

      {page === 0 ? (
        <SpacePage>
          <SpaceMap>
            <Map
              selectedPlace={attendInfo.place}
              places={places}
              width="100%"
              height="200px"
            />
          </SpaceMap>
          <span>1지망 선택</span>
          <SpaceSelector>
            <PlaceSelector
              placeVoteInfo={placeVoteInfo}
              selectedPlace={attendInfo.place}
              isSelectUnit={true}
              setSelectedPlace={(place) => {
                setAttendInfo({ ...attendInfo, place });
                console.log(place);
                setPage(1);
              }}
            />
          </SpaceSelector>
        </SpacePage>
      ) : page === 1 ? (
        <SpacePage>
          <SpaceMap>
            <Map
              selectedPlace={attendInfo.place}
              places={places}
              width="100%"
              height="200px"
            />
          </SpaceMap>
          <span>2지망 선택(여러개)</span>
          <SpaceSelector>
            <PlaceSelector
              placeVoteInfo={placeVoteInfo}
              selectedPlace={attendInfo.place}
              isSelectUnit={false}
              setSelectedPlace={(place) => {
                setAttendInfo({ ...attendInfo, place });
                setPage(1);
              }}
            />
          </SpaceSelector>
          <SecondPageNav>
            <button onClick={() => setPage(0)}>뒤로가기</button>
            <button onClick={onSpaceSubmit}>다음</button>
          </SecondPageNav>
        </SpacePage>
      ) : (
        <></>
      )}
    </ModalLayout>
  );
}
export default StudyVoteModal;
