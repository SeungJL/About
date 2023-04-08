import styled from "styled-components";
import { useToast } from "@chakra-ui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "react-query";
import { motion } from "framer-motion";

import {
  ModalFooterNav,
  ModalMain,
  ModalMd,
} from "../../../styles/layout/modal";

import { useRecoilValue } from "recoil";
import { isVotingState, voteDateState } from "../../../recoil/studyAtoms";
import { useVoteQuery } from "../../../hooks/vote/queries";
import { useAttendMutation } from "../../../hooks/vote/mutations";
import { useScoreMutation } from "../../../hooks/user/mutations";

import PlaceSelector from "../../../components/utils/placeSelector";
import TimeSelector from "../../../components/utils/TimeSelector";

import { VOTE_GET } from "../../../libs/queryKeys";
import { IplaceInfo } from "../../../types/statistics";
import { ITimeStartToEndHM } from "../../../types/utils";
import { IVoteInfo } from "../../../types/studyDetails";
import { ModalHeader } from "../../../components/Layout/Component";

function VoteStudyModal({
  setIsShowModal,
}: {
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [page, setPage] = useState(0);
  const voteDate = useRecoilValue(voteDateState);
  const isVoting = useRecoilValue(isVotingState);

  const toast = useToast();
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState("");

  const { data: vote } = useVoteQuery(voteDate, {
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

  const { mutate: getScore } = useScoreMutation();

  const placeInfoArr: IplaceInfo[] = [{}, {}, {}, {}];
  const participations = vote?.participations;
  participations?.forEach((participant) => {
    const temp = {
      placeName: participant.place,
      voteCnt: participant.attendences.length,
      status: participant.status,
    };
    const brand = participant.place.brand;
    if (brand === "탐앤탐스") placeInfoArr[1] = temp;
    else if (brand === "커피빈") placeInfoArr[0] = temp;
    else if (brand === "카탈로그") placeInfoArr[3] = temp;
    else if (brand === "아티제") placeInfoArr[2] = temp;
  });

  const [firstPlace, setFirstPlace] = useState<IplaceInfo[]>([]);
  const [secondPlaces, setSecondPlaces] = useState<IplaceInfo[]>([]);

  const [time, setTime] = useState<ITimeStartToEndHM>({
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
      !isVoting && getScore(5);
      window.location.reload();
    },
  });

  const onSubmit = async () => {
    const start = time.start;
    const end = time.end;

    const voteInfos: IVoteInfo = {
      place: firstPlace[0].placeName,
      subPlace: secondPlaces.map((place) => place.placeName),
      start: voteDate.hour(start.hour).minute(start.minutes),
      end: voteDate.hour(end.hour).minute(end.minutes),
    };

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
    setIsShowModal(false);

    await patchAttend(voteInfos);
  };

  return (
    <>
      <Layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalHeader
          title={voteDate.format("M월 DD일 스터디 투표")}
          setIsModal={setIsShowModal}
        />
        {page === 0 ? (
          <>
            <ModalMain>
              <Subtitle>1지망 선택</Subtitle>
              <PlaceSelector
                placeInfoArr={placeInfoArr}
                isSelectUnit={true}
                firstPlace={firstPlace}
                setSelectedPlace={setFirstPlace}
              />
            </ModalMain>
            <ModalFooterNav>
              <Error>{errorMessage}</Error>
              <button onClick={firstSubmit}>다음</button>
            </ModalFooterNav>
          </>
        ) : page === 1 ? (
          <>
            <ModalMain>
              <Subtitle>2지망 선택</Subtitle>
              <PlaceSelector
                placeInfoArr={placeInfoArr}
                isSelectUnit={false}
                firstPlace={firstPlace}
                secondPlaces={secondPlaces}
                setSelectedPlace={setSecondPlaces}
              />
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
              </TimeWrapper>
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setPage(1)}>뒤로가기</button>
              <button onClick={onSubmit}>제출</button>
            </ModalFooterNav>
          </>
        )}
      </Layout>
    </>
  );
}
export default VoteStudyModal;

const Layout = styled(motion(ModalMd))``;

const Subtitle = styled.div`
  color: var(--font-h2);
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 8px;
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

const TimeWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

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
  margin-right: 16px;
  color: var(--color-red);
`;

const Time = styled.div`
  margin-top: 16px;
  padding-top: 12px;
`;
