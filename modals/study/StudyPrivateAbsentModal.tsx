import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLayout } from "../../components/modals/Modals";
import { POINT_SYSTEM_Deposit } from "../../constants/contentsValue/pointSystem";
import { useCompleteToast, useErrorToast } from "../../hooks/CustomToast";
import { useStudyAbsentMutation } from "../../hooks/study/mutations";
import { useDepositMutation } from "../../hooks/user/pointSystem/mutation";
import { isRefetchStudySpaceState } from "../../recoil/refetchingAtoms";
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function StudyPrivateAbsentModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const router = useRouter();
  const voteDate = dayjs(router.query.date as string);

  const setIsRefetchStudySpace = useSetRecoilState(isRefetchStudySpaceState);

  const { mutate: getDeposit } = useDepositMutation();
  const { mutate: absentStudy } = useStudyAbsentMutation(voteDate, {
    onSuccess: () => {
      setIsRefetchStudySpace(true);
      let fee = POINT_SYSTEM_Deposit.STUDY_PRIVATE_ABSENT;
      getDeposit(fee);
      completeToast("success");
    },
    onError: errorToast,
  });

  return (
    <ModalLayout size="sm">
      <ModalHeaderX title="개인 스터디 불참" setIsModal={setIsModal} />
      <ModalMain>
        불참하시겠어요? <br />
        -100원의 벌금이 발생합니다.
      </ModalMain>
      <Button colorScheme="mintTheme" onClick={() => absentStudy(null)}>
        불참
      </Button>
    </ModalLayout>
  );
}

const Layout = styled.div``;

export default StudyPrivateAbsentModal;
