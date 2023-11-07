import { useState } from "react";
import { useRecoilValue } from "recoil";
import TimeSelector from "../../../components/features/picker/TimeSelector";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../../components/modals/Modals";
import { STUDY_VOTE } from "../../../constants/keys/queryKeys";
import { dayjsToFormat, dayjsToStr } from "../../../helpers/dateHelpers";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";
import { useStudyQuickVoteMutation } from "../../../hooks/study/mutations";
import { voteDateState } from "../../../recoil/studyAtoms";
import { locationState } from "../../../recoil/userAtoms";
import { IModal } from "../../../types/reactTypes";
import { ITimeStartToEnd } from "../../../types/timeAndDate";

function StudyQuickVoteModal({ setIsModal }: IModal) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);

  const [time, setTime] = useState<ITimeStartToEnd>({
    start: { hours: 14, minutes: 0 },
    end: { hours: 18, minutes: 0 },
  });

  const resetQueryData = useResetQueryData();

  const { mutate } = useStudyQuickVoteMutation(voteDate, {
    onSuccess() {
      completeToast("studyVote");
      resetQueryData([STUDY_VOTE, dayjsToStr(voteDate), location]);
    },
    onError: errorToast,
  });

  const onSubmit = () => {
    const start = voteDate.hour(time.start.hours).minute(time.start.minutes);
    const end = voteDate.hour(time.end.hours).minute(time.end.minutes);
    if (start > end) {
      failToast("time");
      return;
    }
    mutate({ start, end });
    setIsModal(false);
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text={`${dayjsToFormat(voteDate, "M월 D일")} 빠른 투표`} />
      <ModalBody>
        <TimeSelector
          setTimes={({ start, end }: ITimeStartToEnd) => {
            if (start) setTime({ end: time.end, start });
            if (end) setTime({ start: time.start, end });
          }}
          times={time}
        />
      </ModalBody>
      <ModalFooterOne isFull={true} onClick={onSubmit} text="투표" />
    </ModalLayout>
  );
}

export default StudyQuickVoteModal;
