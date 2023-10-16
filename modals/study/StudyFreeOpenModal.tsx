import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import TimeSelector from "../../components/features/picker/TimeSelector";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import {
  useStudyOpenFreeMutation,
  useStudyParticipateMutation,
} from "../../hooks/study/mutations";
import { isRefetchStudySpaceState } from "../../recoil/refetchingAtoms";
import { IModal } from "../../types/reactTypes";
import { IStudyParticipate } from "../../types/study/study";
import { IPlace } from "../../types/study/studyDetail";
import { ITimeStartToEnd } from "../../types/timeAndDate";

interface IStudyFreeOpenModal extends IModal {
  place: IPlace;
}

function StudyFreeOpenModal({ place, setIsModal }: IStudyFreeOpenModal) {
  const router = useRouter();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const errorToast = useErrorToast();

  const voteDate = dayjs(router.query.date as string);
  const placeId = router.query.placeId;

  const setIsRefetch = useSetRecoilState(isRefetchStudySpaceState);

  const [time, setTime] = useState<ITimeStartToEnd>({
    start: { hours: 14, minutes: 0 },
    end: { hours: 18, minutes: 0 },
  });

  const { mutateAsync: openFree } = useStudyOpenFreeMutation(voteDate, {
    onSuccess() {},
    onError: errorToast,
  });
  const { mutate: patchAttend } = useStudyParticipateMutation(voteDate, {
    onSuccess: () => {
      setIsRefetch(true);
      setIsModal(false);
      completeToast("free", "스터디가 Free로 오픈되었습니다.");
    },
    onError: errorToast,
  });

  const onSubmit = async () => {
    const start = voteDate.hour(time.start.hours).minute(time.start.minutes);
    const end = voteDate.hour(time.end.hours).minute(time.end.minutes);
    if (start > end) {
      failToast("time");
      return;
    }
    try {
      await openFree(placeId as string);
      const data: IStudyParticipate = {
        place,
        start,
        end,
      };
      patchAttend(data);
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text="스터디 FREE 오픈" />
      <ModalBody>
        <TimeSelector
          setTimes={({ start, end }: ITimeStartToEnd) => {
            if (start) setTime({ end: time.end, start });
            if (end) setTime({ start: time.start, end });
          }}
          times={time}
        />
      </ModalBody>
      <ModalFooterOne text="오픈" onClick={onSubmit} isFull={true} />
    </ModalLayout>
  );
}

export default StudyFreeOpenModal;
