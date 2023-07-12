import dayjs from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";

import styled from "styled-components";

import { useStudyArrivedMutation } from "../../hooks/study/mutations";

import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMain,
  ModalMd,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IAttendance } from "../../types/studyDetails";

import { useRouter } from "next/router";
import { ModalLayout } from "../../components/common/modal/Modals";
import { InputSm } from "../../styles/layout/input";

interface IStudyChangeArrivedModal {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  user: IAttendance;
}

function StudyChangeArrivedModal({
  setIsModal,
  user,
}: IStudyChangeArrivedModal) {
  const router = useRouter();
  const [memo, setMemo] = useState(user?.memo);

  const voteDate = dayjs(router.query.date as string);

  const { mutate: changeMemo } = useStudyArrivedMutation(dayjs(voteDate), {});

  const onCancelClicked = () => {
    setIsModal(false);
  };

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
        <button type="button" onClick={onCancelClicked}>
          취소
        </button>
        <button type="button" form="changeMemo" onClick={onChangeMemo}>
          변경
        </button>
      </ModalFooterNav>
    </ModalLayout>
  );
}

const Container = styled.div``;

const Layout = styled(ModalMd)`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-bottom: 12px;
`;

const Form = styled.form`
  height: 100%;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;

  border-radius: 50%;
  font-size: 13px;
  font-weight: 600;
  width: 250px;
  height: 250px;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  > div {
    height: 10px;
  }
`;

export default StudyChangeArrivedModal;
