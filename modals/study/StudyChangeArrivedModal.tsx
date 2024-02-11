import dayjs from "dayjs";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { useCompleteToast } from "../../hooks/custom/CustomToast";
import { useStudyArrivedMutation } from "../../hooks/study/mutations";
import { isRefetchstudyState } from "../../recoil/refetchingAtoms";
import { voteDateState } from "../../recoil/studyAtoms";
import { Textarea } from "../../styles/layout/input";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import { IAttendance } from "../../types/study/studyDetail";

interface IStudyChangeArrivedModal extends IModal {
  user: IAttendance;
}

function StudyChangeArrivedModal({
  setIsModal,
  user,
}: IStudyChangeArrivedModal) {
  const completeToast = useCompleteToast();

  const voteDate = useRecoilValue(voteDateState);
  const setIsRefetch = useSetRecoilState(isRefetchstudyState);

  const [memo, setMemo] = useState(user?.memo);

  const { mutate: changeMemo } = useStudyArrivedMutation(dayjs(voteDate), {
    onSuccess() {
      completeToast("success");
      setIsRefetch(true);
    },
  });

  const onChangeMemo = () => {
    changeMemo(memo);
    setIsModal(false);
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text="출석 메모 변경" />
      <ModalBody>
        <ModalSubtitle>내용을 변경하시겠어요?</ModalSubtitle>
        <Textarea
          placeholder="여기에 작성해주세요!"
          onChange={(e) => setMemo(e.target.value)}
          value={memo}
        />
      </ModalBody>
      <ModalFooterTwo
        leftText="취소"
        rightText="변경"
        onClickLeft={() => setIsModal(false)}
        onClickRight={onChangeMemo}
      />
    </ModalLayout>
  );
}

export default StudyChangeArrivedModal;
