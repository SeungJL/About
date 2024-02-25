import dayjs from "dayjs";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IFooterOptions, ModalLayout } from "../../components/modals/Modals";
import { useCompleteToast } from "../../hooks/custom/CustomToast";
import { useStudyAttendCheckMutation } from "../../hooks/study/mutations";
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

  const { mutate: changeMemo } = useStudyAttendCheckMutation(dayjs(voteDate), {
    onSuccess() {
      completeToast("success");
      setIsRefetch(true);
    },
  });

  const onChangeMemo = () => {
    changeMemo(memo);
    setIsModal(false);
  };

  const footerOptions: IFooterOptions = {
    main: {
      text: "변경",
      func: onChangeMemo,
    },
    sub: {
      text: "취소",
    },
  };

  return (
    <ModalLayout
      title="출석 메모 변경"
      setIsModal={setIsModal}
      footerOptions={footerOptions}
    >
      <ModalSubtitle>내용을 변경하시겠어요?</ModalSubtitle>
      <Textarea
        placeholder="여기에 작성해주세요!"
        onChange={(e) => setMemo(e.target.value)}
        value={memo}
      />
    </ModalLayout>
  );
}

export default StudyChangeArrivedModal;
