import { useToast } from "@chakra-ui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import PlaceSelector, {
  IplaceInfo,
} from "../../../components/utils/placeSelector";
import TimeSelector from "../../../components/utils/TimeSelector";
import {
  useAbsentMutation,
  useAttendMutation,
} from "../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../libs/queryKeys";
import { hourMinToDate } from "../../../libs/utils/dateUtils";

import { IPlace } from "../../../models/place";
import { IParticipation } from "../../../models/vote";
import {
  isShowStudyVoteModalState,
  modalContextState,
} from "../../../recoil/modalAtoms";

import ModalPortal from "../../../components/ModalPortal";
import { ITimeStartToEnd } from "../../../types/utils";
import { useVoteQuery } from "../../../hooks/vote/queries";
import { ModalLg, ModalSm } from "../../../styles/LayoutStyles";
import { voteDateState } from "../../../recoil/atoms";

function VoteStudyModal({
  setIsShowModal,
}: {
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [page, setPage] = useState(0);
  const voteDate = useRecoilValue(voteDateState);
  const toast = useToast();
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState("");

  const { data: vote, isLoading } = useVoteQuery(voteDate, {
    enabled: true,
    onError: (err) => {
      toast({
        title: "불러오기 실패",
        description: "투표 정보를 불러오지 못 했어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });
  const { mutate: handleAbsent, isLoading: absentLoading } = useAbsentMutation(
    voteDate,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([VOTE_GET, voteDate]);
      },
      onError: (err) => {
        toast({
          title: "오류",
          description: "참여 취소 신청 중 문제가 발생했어요.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      },
    }
  );
  const placeInfoArr: IplaceInfo[] = [{}, {}, {}, {}];
  const participations = vote?.participations;
  participations?.forEach((participant) => {
    const placeName = participant.place;
    const voteCnt = participant.attendences.length;
    const status = participant.status;
    const temp = { placeName, voteCnt, status };
    const brand = placeName.brand;
    if (brand === "탐앤탐스") placeInfoArr[1] = temp;
    else if (brand === "할리스") placeInfoArr[0] = temp;
    else if (brand === "카탈로그") placeInfoArr[3] = temp;
    else if (brand === "아티제") placeInfoArr[2] = temp;
    // return { placeName, voteCnt, status };
  });

  const [firstPlace, setFirstPlace] = useState<IplaceInfo[]>([]);
  const [secondPlaces, setSecondPlaces] = useState<IplaceInfo[]>([]);

  const [time, setTime] = useState<ITimeStartToEnd>({
    start: { hour: 12, minutes: 0 },
    end: { hour: 18, minutes: 0 },
  });

  const firstSubmit = () => {
    if (firstPlace.length === 0) {
      setErrorMessage("장소를 선택해주세요!");
      return;
    }
    setPage(1);
  };

  const { mutate: patchAttend } = useAttendMutation(voteDate, {
    onSuccess: () => {
      queryClient.invalidateQueries(VOTE_GET);
    },
  });

  const onSubmit = async () => {
    const start = time.start;
    const end = time.end;

    const voteInfos = {
      place: firstPlace[0].placeName,
      subPlace: secondPlaces.map((place) => place.placeName),
      start: voteDate.hour(start.hour).minute(start.minutes),
      end: voteDate.hour(end.hour).minute(end.minutes),
    };

    if (start.hour * 60 + start.minutes >= end.hour * 60 + end.minutes) {
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
    setIsShowModal(false);

    // await handleAbsent();
    await patchAttend(voteInfos);
  };

  return (
    <>
      <Layout>
        <Header>
          <span>{voteDate.format("M월 DD일 스터디 투표")}</span>
          <div onClick={() => setIsShowModal(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </Header>

        {page === 0 ? (
          <>
            <Main>
              <span>1지망 선택</span>
              <SpacePage>
                <PlaceSelector
                  placeInfoArr={placeInfoArr}
                  isSelectUnit={true}
                  firstPlace={firstPlace}
                  setSelectedPlace={setFirstPlace}
                />
              </SpacePage>
            </Main>
            <PageNav>
              <Error>{errorMessage}</Error>
              <button onClick={firstSubmit}>다음</button>
            </PageNav>
          </>
        ) : page === 1 ? (
          <>
            <Main>
              <span>2지망 선택</span>
              <SpacePage>
                <PlaceSelector
                  placeInfoArr={placeInfoArr}
                  isSelectUnit={false}
                  firstPlace={firstPlace}
                  secondPlaces={secondPlaces}
                  setSelectedPlace={setSecondPlaces}
                />
              </SpacePage>
            </Main>
            <PageNav>
              <button onClick={() => setPage(0)}>뒤로가기</button>
              <button onClick={() => setPage(2)}>다음</button>
            </PageNav>
          </>
        ) : (
          <>
            <Time>
              <TimeSelector
                setTimes={({ start, end }: ITimeStartToEnd) => {
                  if (start) {
                    setTime({ end: time.end, start });
                  }
                  if (end) {
                    setTime({ start: time.start, end });
                  }
                }}
                times={time}
              />
            </Time>
            <SubmitNav>
              <button onClick={() => setPage(1)}>뒤로가기</button>
              <button onClick={onSubmit}>제출</button>
            </SubmitNav>
          </>
        )}
      </Layout>
    </>
  );
}
export default VoteStudyModal;

const Layout = styled(ModalLg)`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-right: 4px;
  > span {
    font-size: 16px;
    font-weight: 600;
    color: var(--font-h1);
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;

  > span {
    display: inline-block;
    color: var(--color-red);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

const SpacePage = styled.div``;

const PageNav = styled.nav`
  margin-top: auto;
  text-align: end;

  > button {
    font-size: 14px;
    color: var(--font-h1);
    margin-left: 14px;
    margin-right: 10px;
    font-weight: 600;
  }
`;

const SubmitNav = styled.nav`
  margin-top: auto;
  text-align: end;

  > button {
    width: 60px;
    font-size: 14px;
    color: var(--font-h1);
    border-radius: 8px;
    padding: 1px;
    margin-left: 6px;
    margin-right: 2px;
  }
  > button:last-child {
    color: white;
    background-color: var(--color-red);
  }
`;

const Error = styled.span`
  font-size: 13px;
  margin-right: 8px;
  color: var(--color-red);
`;

const Time = styled.div`
  margin-top: 16px;
  padding-top: 12px;
`;
