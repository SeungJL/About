import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PlaceSelector from "../../../components/features/picker/PlaceSelector";
import {
  ModalBody,
  ModalFooterOne,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../../components/modals/Modals";
import { POINT_SYSTEM_PLUS } from "../../../constants/contentsValue/pointSystem";
import { STUDY_VOTE } from "../../../constants/keys/queryKeys";
import { dayjsToFormat, dayjsToStr } from "../../../helpers/dateHelpers";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";
import {
  useStudyOpenFreeMutation,
  useStudyParticipationMutation,
} from "../../../hooks/study/mutations";
import { useAboutPointMutation } from "../../../hooks/user/mutations";

import {
  myVotingState,
  participationsState,
  studyDateStatusState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import { locationState } from "../../../recoil/userAtoms";
import { IModal } from "../../../types/reactTypes";
import { IStudyParticipate, IStudyPlaces } from "../../../types/study/study";
import { IPlace } from "../../../types/study/studyDetail";

import StudyVoteMainModalTime from "./StudyVoteMainModalTime";

interface IStudyVoteMainModal extends IModal {
  isFreeOpen?: boolean;
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
  const myVoting = useRecoilValue(myVotingState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const location = useRecoilValue(locationState);

  const resetQueryData = useResetQueryData();
  const [page, setPage] = useState(0);
  const [places, setPlaces] = useState<IStudyVotePlaces[]>();
  const [votePlaces, setVotePlaces] = useState<IStudyPlaces>({
    place: undefined,
    subPlace: [],
  });
  const [voteInfo, setVoteInfo] = useState<IStudyParticipate>();

  const placeCnt = participations?.length;
  const modalSize = placeCnt > 6 ? "xl" : placeCnt > 4 ? "lg" : "md";

  const { mutate: getAboutPoint } = useAboutPointMutation();

  const { mutate: patchAttend } = useStudyParticipationMutation(
    voteDate,
    "post",
    {
      onSuccess: () => {
        getPoint();
        completeToast("studyVote");
        resetQueryData([STUDY_VOTE, dayjsToStr(voteDate), location]);
      },
      onError: errorToast,
    }
  );
  const { mutate: openFree } = useStudyOpenFreeMutation(voteDate, {
    onSuccess() {
      completeToast("free", "스터디가 Free로 오픈되었습니다.");
      setIsModal(false);
    },
    onError: errorToast,
  });

  //투표 완료시 점수 획득
  const getPoint = () => {
    if (!myVoting) {
      if (studyDateStatus === "today") {
        getAboutPoint(POINT_SYSTEM_PLUS.STUDY_VOTE_DAILY);
      }
      // if (studyDateStatus === "not passed") {
      //   getAboutPoint(POINT_SYSTEM_PLUS.STUDY_VOTE);
      // }
    }
  };

  //메인 장소 선택
  const firstSubmit = () => {
    if (!votePlaces?.place) {
      failToast("free", "장소를 선택해주세요!");
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
    setTimeout(() => {
      patchAttend(voteInfo);
    }, 1000);
  };

  //스터디 장소와 투표인원수 나열
  useEffect(() => {
    const temp: IStudyVotePlaces[] = participations
      ?.map((participation) => ({
        place: participation.place,
        voteCnt: participation.attendences.length,
      }))
      .filter((study) => study.place.brand !== "자유 신청");
    setPlaces(temp);
  }, [participations]);

  //장소가 업데이트 될때마다 투표 정보도 업데이트
  useEffect(() => {
    setVoteInfo((old) => ({ ...old, ...votePlaces }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votePlaces]);

  const subtitle = isFreeOpen
    ? "FREE OPEN"
    : page === 0
    ? "MAIN PICK"
    : page === 1
    ? "SUB PICK"
    : "TIME PICK";

  return (
    <>
      <ModalLayout
        onClose={() => setIsModal(false)}
        size={modalSize}
        height={modalSize !== "xl" ? 340 : undefined}
      >
        <ModalHeader
          text={dayjsToFormat(
            voteDate,
            `M월 D일 스터디 ${isFreeOpen ? "오픈" : "투표"}`
          )}
        />
        <ModalBody>
          <Subtitle>{subtitle}</Subtitle>
          {page === 0 || page === 1 ? (
            <PlaceSelector
              places={places}
              votePlaces={votePlaces}
              setVotePlaces={setVotePlaces}
              isMain={page === 0}
            />
          ) : (
            <StudyVoteMainModalTime
              setVoteInfo={setVoteInfo}
              isTimeBoard={modalSize !== "md"}
            />
          )}
        </ModalBody>

        {page === 0 ? (
          <ModalFooterOne onClick={firstSubmit} text="다음" />
        ) : page === 1 ? (
          <ModalFooterTwo
            onClickLeft={() => setPage(0)}
            onClickRight={() => setPage(2)}
          />
        ) : (
          <ModalFooterTwo
            onClickLeft={() => setPage(1)}
            onClickRight={onSubmit}
            rightText="완료"
          />
        )}
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

export default StudyVoteMainModal;
