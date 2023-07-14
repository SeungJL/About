import dayjs from "dayjs";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalLayout } from "../../components/common/modal/Modals";
import { useStudyArrivedMutation } from "../../hooks/study/mutations";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";
import { isRefetchStudySpacelState } from "../../recoil/refetchingAtoms";
import { voteDateState } from "../../recoil/studyAtoms";
import { InputSm } from "../../styles/layout/input";
import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMain,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IModal } from "../../types/common";
import { IAttendance } from "../../types/studyDetails";

interface IStudyChangeArrivedModal extends IModal {
  user: IAttendance;
}

function StudyChangeArrivedModal({
  setIsModal,
  user,
}: IStudyChangeArrivedModal) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const voteDate = useRecoilValue(voteDateState);
  const setIsRefetch = useSetRecoilState(isRefetchStudySpacelState);

  const [memo, setMemo] = useState(user?.memo);

  const { mutate: changeMemo } = useStudyArrivedMutation(dayjs(voteDate), {
    onSuccess() {
      completeToast("success");
      setIsRefetch(true);
    },
  });

  const onChangeMemo = async () => {
    await changeMemo(memo);
    setIsModal(false);
  };

  return (
    <ModalLayout size="md">
      <ModalHeaderLine>도착 메모</ModalHeaderLine>
      <ModalMain>
        <ModalSubtitle>내용을 변경하시겠어요?</ModalSubtitle>
        <Form id="changeMemo">
          <InputSm
            placeholder="여기에 작성해주세요!"
            onChange={(e) => setMemo(e.target.value)}
            value={memo}
          />
        </Form>
      </ModalMain>
      <ModalFooterNav>
        <button type="button" onClick={() => setIsModal(false)}>
          취소
        </button>
        <button type="button" form="changeMemo" onClick={onChangeMemo}>
          변경
        </button>
      </ModalFooterNav>
    </ModalLayout>
  );
}

const Form = styled.form`
  height: 100%;
`;

export default StudyChangeArrivedModal;
