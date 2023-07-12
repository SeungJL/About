import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useStudyParticipateMutation } from "../../../hooks/study/mutations";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { ModalMd } from "../../../styles/layout/modal";

import { POINT_SYSTEM_PLUS } from "../../../constants/pointSystem";
import { useCompleteToast } from "../../../hooks/ui/CustomToast";
import {
  usePointMutation,
  useScoreMutation,
} from "../../../hooks/user/pointSystem/mutation";
import { STUDY_VOTE_INFO } from "../../../libs/queryKeys";
import { arrangeSpace } from "../../../libs/utils/studyUtils";
import { isRefetchStudyState } from "../../../recoil/refetchingAtoms";
import {
  isVotingState,
  studyDateState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import { userLocationState } from "../../../recoil/userAtoms";
import { IModal } from "../../../types/common";
import { IplaceInfo } from "../../../types/statistics";
import { IVoteInfo } from "../../../types/studyDetails";
import { ITimeStartToEndHM } from "../../../types/utils";
import StudyVoteMainModalBig from "./StudyVoteMainModalBig";
import StudyVoteMainModalSmall from "./StudyVoteMainModalSmall";

interface IStudyVoteMainModal extends IModal {
  isBig?: boolean;
}

function StudyVoteMainModal({ setIsModal, isBig }: IStudyVoteMainModal) {
  const toast = useToast();
  const completeToast = useCompleteToast();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const location = useRecoilValue(userLocationState);
  const voteDate = useRecoilValue(voteDateState);
  const isVoting = useRecoilValue(isVotingState);
  const studyDate = useRecoilValue(studyDateState);

  const setUpdateStudy = useSetRecoilState(isRefetchStudyState);

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

  const [time, setTime] = useState<ITimeStartToEndHM>({
    start: isBig ? null : { hours: 14, minutes: 0 },
    end: isBig ? null : { hours: 18, minutes: 0 },
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
      queryClient.invalidateQueries(STUDY_VOTE_INFO);
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
      completeToast("studyVote");
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
    if (start.hours * 60 + start.minutes >= end.hours * 60 + end.minutes) {
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
      start: voteDate.hour(start.hours).minute(start.minutes),
      end: voteDate.hour(end.hours).minute(end.minutes),
    };

    setIsModal(false);
    await patchAttend(voteInfos);
  };

  return <>{isBig ? <StudyVoteMainModalBig /> : <StudyVoteMainModalSmall />}</>;
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
