import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import TimeSelector from "../../../components/features/picker/TimeSelector";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../../components/modals/Modals";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/CustomToast";
import { useStudyQuickVoteMutation } from "../../../hooks/study/mutations";
import { isRefetchStudyState } from "../../../recoil/refetchingAtoms";
import { voteDateState } from "../../../recoil/studyAtoms";
import { IModal } from "../../../types/reactTypes";
import { ITimeStartToEnd } from "../../../types/timeAndDate";

function StudyQuickVoteModal({ setIsModal }: IModal) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const voteDate = useRecoilValue(voteDateState);
  const setIsRefetchStudy = useSetRecoilState(isRefetchStudyState);

  const [time, setTime] = useState<ITimeStartToEnd>({
    start: { hours: 14, minutes: 0 },
    end: { hours: 18, minutes: 0 },
  });

  const { mutate } = useStudyQuickVoteMutation(voteDate, {
    onSuccess() {
      setIsRefetchStudy(true);
      completeToast("studyVote");
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
