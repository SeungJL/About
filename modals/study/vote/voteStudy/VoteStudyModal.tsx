import { useToast } from "@chakra-ui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import PlaceSelector, { IplaceInfo } from "./vote/placeSelector";
import TimeSelector from "./vote/timeSelector";
import {
  useAbsentMutation,
  useAttendMutation,
} from "../../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../../libs/queryKeys";
import { hourMinToDate } from "../../../../libs/utils/dateUtils";

import { IPlace } from "../../../../models/place";
import { IParticipation } from "../../../../models/vote";
import {
  isShowStudyVoteModalState,
  modalContextState,
} from "../../../../recoil/modalAtoms";
import { isVotingState, voteDateState } from "../../../../recoil/studyAtoms";
import ModalPortal from "../../../../components/ModalPortal";
import { ITimeStartToEnd } from "../../../../types/utils";
import { useVoteQuery } from "../../../../hooks/vote/queries";
import { ModalLg, ModalSm } from "../../../../styles/LayoutStyles";

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
  const participations = vote?.participations;
  const placeInfoArr = participations?.map((participant) => {
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

    await handleAbsent();
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
                  if (start) setTime({ ...time, start });
                  if (end) setTime({ ...time, end });
                }}
                times={time}
              />
            </Time>
            <PageNav>
              <button onClick={() => setPage(1)}>뒤로가기</button>
              <button onClick={onSubmit}>제출</button>
            </PageNav>
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
  padding: 16px;
  padding-bottom: 12px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  > span {
    font-size: 16px;
    font-weight: 600;
    color: #343943;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;

  > span {
    display: inline-block;
    color: #8b4513;
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
    width: 60px;
    font-size: 0.8em;
    background-color: #8b4513;
    color: #ffffff;
    margin-left: 10px;
    border-radius: 10px;
    padding: 3px;
  }
`;

const Error = styled.span`
  font-size: 13px;
  color: #ffa500;
`;

const Time = styled.div`
  margin-top: 12px;
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
const ModalLayout = styled(ModalSm)``;
