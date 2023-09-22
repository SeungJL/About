import { SetStateAction, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import PlaceSelector from "../../../components/features/picker/PlaceSelector";
import { ModalHeaderX } from "../../../components/modal/ModalComponents";
import { ModalLayout } from "../../../components/modal/Modals";
import { POINT_SYSTEM_PLUS } from "../../../constants/pointSystem";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/CustomToast";
import {
  useStudyOpenFreeMutation,
  useStudyParticipateMutation,
} from "../../../hooks/study/mutations";
import {
  usePointMutation,
  useScoreMutation,
} from "../../../hooks/user/pointSystem/mutation";
import { isRefetchStudyState } from "../../../recoil/refetchingAtoms";
import {
  isVotingState,
  participationsState,
  studyDateStatusState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import { ModalFooterNav, ModalMain } from "../../../styles/layout/modal";
import { DispatchNumber, IModal } from "../../../types/reactTypes";
import { IParticipation, IPlace } from "../../../types/study/study";
import {
  IStudyParticipate,
  IStudyPlaces,
} from "../../../types/study/studyUserAction";
import StudyVoteMainModalTime from "./StudyVoteMainModalTime";

interface IStudyVoteMainModal extends IModal {
  isFreeOpen?: boolean;
}

interface IStudyVoteMainModalPlace {
  page: number;
  setPage: DispatchNumber;
  setVoteInfo: React.Dispatch<SetStateAction<IStudyParticipate>>;
  isBig: boolean;
  participations?: IParticipation[];
}

export interface IStudyVotePlaces {
  place: IPlace;
  voteCnt: number;
}
function StudyVoteMainModal({ setIsModal, isFreeOpen }: IStudyVoteMainModal) {
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();

  const participations = useRecoilValue(participationsState);
  const voteDate = useRecoilValue(voteDateState);
  const isVoting = useRecoilValue(isVotingState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const setUpdateStudy = useSetRecoilState(isRefetchStudyState);

  const [page, setPage] = useState(0);
  const [places, setPlaces] = useState<IStudyVotePlaces[]>();
  const [votePlaces, setVotePlaces] = useState<IStudyPlaces>({
    place: undefined,
    subPlace: [],
  });
  const [voteInfo, setVoteInfo] = useState<IStudyParticipate>();
  const [errorMessage, setErrorMessage] = useState("");

  const placeCnt = participations?.length;
  const modalSize = placeCnt > 6 ? "xl" : placeCnt > 4 ? "lg" : "md";

  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { mutate: patchAttend } = useStudyParticipateMutation(voteDate, {
    onSuccess: () => {
      getAboutPoint();
      completeToast("studyVote");
      setUpdateStudy(true);
    },
    onError: errorToast,
  });
  const { mutate: openFree } = useStudyOpenFreeMutation(voteDate, {
    onSuccess() {
      completeToast("free", "스터디가 Free로 오픈되었습니다.");
      setIsModal(false);
    },
    onError: errorToast,
  });

  //투표 완료시 점수 획득
  const getAboutPoint = () => {
    if (!isVoting) {
      if (studyDateStatus === "today") {
        getScore(POINT_SYSTEM_PLUS.voteStudyDaily.score);
        getPoint(POINT_SYSTEM_PLUS.voteStudyDaily.point);
      }
      if (studyDateStatus === "not passed") {
        getScore(POINT_SYSTEM_PLUS.voteStudy.score);
        getPoint(POINT_SYSTEM_PLUS.voteStudy.point);
      }
    }
  };

  //메인 장소 선택
  const firstSubmit = () => {
    if (!votePlaces?.place) {
      setErrorMessage("장소를 선택해주세요!");
      return;
    }
    if (studyDateStatus === "today" || isFreeOpen) setPage(2);
    else setPage(1);
  };

  //최종 제출
  const onSubmit = () => {
    const startTime = voteInfo?.start;
    const endTime = voteInfo?.end;
    if (!startTime || !endTime) {
      failToast("free", "시작 시간과 종료 시간을 모두 선택해 주세요!");
      return;
    }
    if (startTime > endTime) {
      failToast("free", "시작 시작은 종료 시간 이전이어야 합니다.");
      return;
    }
    if (isFreeOpen) {
      openFreeStudy();
      return;
    }
    patchAttend(voteInfo);
    setIsModal(false);
  };

  const openFreeStudy = async () => {
    const choicedPlace = voteInfo.place;
    await openFree(choicedPlace._id);
    await patchAttend(voteInfo);
  };

  //스터디 장소와 투표인원수 나열
  useEffect(() => {
    const temp: IStudyVotePlaces[] = participations?.map((participation) => ({
      place: participation.place,
      voteCnt: participation.attendences.length,
    }));
    setPlaces(temp);
  }, [participations]);

  //장소가 업데이트 될때마다 투표 정보도 업데이트
  useEffect(() => {
    setVoteInfo((old) => ({ ...old, ...votePlaces }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votePlaces]);

  return (
    <>
      <ModalLayout size={modalSize} height={modalSize === "lg" && 320}>
        <ModalHeaderX
          title={dayjsToFormat(
            voteDate,
            `M월 D일 스터디 ${isFreeOpen ? "오픈" : "투표"}`
          )}
          setIsModal={setIsModal}
        />
        <ModalMain>
          <Subtitle>
            {isFreeOpen
              ? "FREE OPEN"
              : page === 0
              ? "MAIN PICK"
              : page === 1
              ? "SUB PICK"
              : "TIME PICK"}
          </Subtitle>
          {page === 0 || page === 1 ? (
            <>
              <PlaceSelector
                places={places}
                votePlaces={votePlaces}
                setVotePlaces={setVotePlaces}
                isMain={page === 0}
              />
            </>
          ) : (
            <StudyVoteMainModalTime
              setVoteInfo={setVoteInfo}
              isTimeBoard={modalSize !== "md"}
            />
          )}
        </ModalMain>
        <ModalFooterNav>
          {page === 0 ? (
            <>
              <Error>{errorMessage}</Error>
              <button onClick={firstSubmit}>다음</button>
            </>
          ) : page === 1 ? (
            <>
              <button onClick={() => setPage(0)}>이전</button>
              <button onClick={() => setPage(2)}>다음</button>
            </>
          ) : (
            <>
              <button onClick={() => setPage(1)}>이전</button>
              <button onClick={onSubmit}>완료</button>
            </>
          )}
        </ModalFooterNav>
      </ModalLayout>
    </>
  );
}
const Subtitle = styled.div`
  color: var(--color-mint);
  font-size: 15px;
  font-weight: 700;
  margin-top: var(--margin-min);
  margin-bottom: var(--margin-sub);
  margin-left: 2px;
`;

const Error = styled.span`
  font-size: 13px;
  margin-right: 16px;
  color: var(--color-red);
`;

export default StudyVoteMainModal;
