import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { POINT_SYSTEM_Deposit } from "../../constants/contentsValue/pointSystem";
import { useCompleteToast, useErrorToast } from "../../hooks/CustomToast";
import { useStudyAbsentMutation } from "../../hooks/study/mutations";
import { useDepositMutation } from "../../hooks/user/pointSystem/mutation";
import { isRefetchStudySpaceState } from "../../recoil/refetchingAtoms";
import { PLACE_TO_NAME } from "../../storage/study";
import { IModal } from "../../types/reactTypes";

function StudyLightAbsentModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const router = useRouter();
  const voteDate = dayjs(router.query.date as string);

  const placeId = router.query.placeId;
  const isPrivate = PLACE_TO_NAME[placeId as string] === "자유신청";

  const setIsRefetchStudySpace = useSetRecoilState(isRefetchStudySpaceState);

  const { mutate: getDeposit } = useDepositMutation();
  const { mutate: absentStudy } = useStudyAbsentMutation(voteDate, {
    onSuccess: () => {
      setIsRefetchStudySpace(true);
      let fee = POINT_SYSTEM_Deposit.STUDY_PRIVATE_ABSENT;
      if (isPrivate) getDeposit(fee);
      completeToast("success");
    },
    onError: errorToast,
  });

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="sm">
      <ModalHeader text="개인 스터디 불참" />
      <ModalBody>
        불참하시겠어요? <br />
        {isPrivate && "-100원의 벌금이 발생합니다."}
      </ModalBody>
      <ModalFooterOne onClick={() => absentStudy(null)} text="불참" />
    </ModalLayout>
  );
}

export default StudyLightAbsentModal;
