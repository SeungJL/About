import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import TimeSelector from "../../components/utils/TimeSelector";
import { ModalFooterNav, ModalMain, ModalMd } from "../../styles/layout/modal";

import { ModalHeaderX } from "../../components/layouts/Modals";

import { useStudyParticipateMutation } from "../../hooks/study/mutations";
import { useStudyVoteQuery } from "../../hooks/study/queries";

import PlaceSelector from "../../components/utils/PlaceSelector";
import PlaceSelectorLg from "../../components/utils/PlaceSelectorLg";
import TimeSelectorLg from "../../components/utils/TimeSelectorLg";
import { POINT_SYSTEM_PLUS } from "../../constants/pointSystem";
import {
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";
import { VOTE_GET } from "../../libs/queryKeys";
import { arrangeSpace } from "../../libs/utils/studyUtils";
import { isRefetchingStudyState } from "../../recoil/refetchingAtoms";
import {
  isVotingState,
  studyDateState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { userLocationState } from "../../recoil/userAtoms";
import { IplaceInfo } from "../../types/statistics";
import { IVoteInfo } from "../../types/studyDetails";
import { ITimeStartToEndHM } from "../../types/utils";

interface IStudyVoteMainModal {
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
  isBig?: boolean;
}

function StudyVoteMainModal({ setIsShowModal, isBig }: IStudyVoteMainModal) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const location = useRecoilValue(userLocationState);
  const voteDate = useRecoilValue(voteDateState);
  const isVoting = useRecoilValue(isVotingState);
  const studyDate = useRecoilValue(studyDateState);

  const setUpdateStudy = useSetRecoilState(isRefetchingStudyState);

  const [errorMessage, setErrorMessage] = useState("");

  const { data: vote } = useStudyVoteQuery(voteDate, location, {
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

  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();

  const participations = arrangeSpace(vote?.participations);

  const placeInfoArr: IplaceInfo[] = participations?.map((participant) => {
    return {
      placeName: participant.place,
      voteCnt: participant.attendences.length,
      status: participant.status,
    };
  });

  const [firstPlace, setFirstPlace] = useState<IplaceInfo[]>([]);
  const [secondPlaces, setSecondPlaces] = useState<IplaceInfo[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const [time, setTime] = useState<ITimeStartToEndHM>({
    start: isBig ? null : { hour: 12, minutes: 0 },
    end: isBig ? null : { hour: 18, minutes: 0 },
  });

  const firstSubmit = () => {
    if (firstPlace.length === 0) {
      setErrorMessage("장소를 선택해주세요!");
      return;
    }
    if (studyDate === "today") setPage(2);
    else setPage(1);
  };

  const { mutate: patchAttend } = useStudyParticipateMutation(voteDate, {
    onSuccess: () => {
      queryClient.invalidateQueries(VOTE_GET);
      if (!isVoting) {
        if (studyDate === "today") {
          getScore(POINT_SYSTEM_PLUS.voteStudyDaily.score);
          getPoint(POINT_SYSTEM_PLUS.voteStudyDaily.point);
        }
        if (studyDate === "not passed") {
          getScore(POINT_SYSTEM_PLUS.voteStudy.score);
          getPoint(POINT_SYSTEM_PLUS.voteStudy.point);
        }
      }
      setUpdateStudy(true);
      setIsComplete(true);
    },
  });

  const onSubmit = async () => {
    const start = time.start;
    const end = time.end;
    if (!start || !end) {
      toast({
        title: "잘못된 입력",
        description: "시작 시간과 종료 시간을 설정해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (start.hour * 60 + start.minutes >= end.hour * 60 + end.minutes) {
      toast({
        title: "잘못된 입력",
        description: "시작 시간은 종료 시간 이전이어야 합니다",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const voteInfos: IVoteInfo = {
      place: firstPlace[0].placeName,
      subPlace: secondPlaces.map((place) => place.placeName),
      start: voteDate.hour(start.hour).minute(start.minutes),
      end: voteDate.hour(end.hour).minute(end.minutes),
    };

    setIsShowModal(false);

    await patchAttend(voteInfos);
  };

  return (
    <>
      <Layout isBig={isBig} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalHeaderX
          title={voteDate.format("M월 D일 스터디 투표")}
          setIsModal={setIsShowModal}
        />
        {page === 0 ? (
          <>
            <ModalMain>
              {location !== "수원" && <Subtitle>1지망 선택</Subtitle>}

              {isBig ? (
                <PlaceSelectorLg
                  placeInfoArr={placeInfoArr}
                  isSelectUnit={true}
                  firstPlace={firstPlace}
                  setSelectedPlace={setFirstPlace}
                />
              ) : (
                <PlaceSelector
                  placeInfoArr={placeInfoArr}
                  isSelectUnit={true}
                  firstPlace={firstPlace}
                  setSelectedPlace={setFirstPlace}
                />
              )}
            </ModalMain>
            <ModalFooterNav>
              <Error>{errorMessage}</Error>
              <button onClick={firstSubmit}>다음</button>
            </ModalFooterNav>
          </>
        ) : page === 1 ? (
          <>
            <ModalMain>
              {location !== "수원" && <Subtitle>2지망 선택</Subtitle>}
              {isBig ? (
                <PlaceSelectorLg
                  placeInfoArr={placeInfoArr}
                  isSelectUnit={false}
                  firstPlace={firstPlace}
                  secondPlaces={secondPlaces}
                  setSelectedPlace={setSecondPlaces}
                />
              ) : (
                <PlaceSelector
                  placeInfoArr={placeInfoArr}
                  isSelectUnit={false}
                  firstPlace={firstPlace}
                  secondPlaces={secondPlaces}
                  setSelectedPlace={setSecondPlaces}
                />
              )}
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setPage(0)}>뒤로가기</button>
              <button onClick={() => setPage(2)}>다음</button>
            </ModalFooterNav>
          </>
        ) : (
          <>
            <ModalMain>
              <TimeWrapper>
                {isBig ? (
                  <>
                    <span>시간 선택</span>
                    <TimeSelectorLg
                      setTimes={({ start, end }: ITimeStartToEndHM) => {
                        setTime({ start, end });
                      }}
                      times={time}
                    />
                  </>
                ) : (
                  <TimeSelector
                    setTimes={({ start, end }: ITimeStartToEndHM) => {
                      if (start) {
                        setTime({ end: time.end, start });
                      }
                      if (end) {
                        setTime({ start: time.start, end });
                      }
                    }}
                    times={time}
                  />
                )}
              </TimeWrapper>
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setPage(1)}>뒤로가기</button>
              <button onClick={onSubmit}>완료</button>
            </ModalFooterNav>
          </>
        )}
      </Layout>
    </>
  );
}
export default StudyVoteMainModal;

const Layout = styled(motion(ModalMd))<{ isBig?: boolean }>`
  height: ${(props) => props.isBig && "var(--height-md)"};
`;

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