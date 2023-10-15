import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import {
  ModalFeeterTwe,
  ModalHeaderX,
} from "../../components/modals/ModalComponents";
import { ModalLeyou } from "../../components/modals/Modals";
import { useCompleteToast, useErrorToast } from "../../hooks/CustomToast";
import { useStudyOpenFreeMutation } from "../../hooks/study/mutations";
import { isRefetchStudySpaceState } from "../../recoil/refetchingAtoms";
import { ModalMain } from "../../styles/layout/modal";

function StudyFreeOpenModal({ setIsModal }) {
  const router = useRouter();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const voteDate = dayjs(router.query.date as string);
  const placeId = router.query.placeId;
  const setIsRefetch = useSetRecoilState(isRefetchStudySpaceState);
  const { mutate: openFree } = useStudyOpenFreeMutation(voteDate, {
    onSuccess() {
      completeToast("free", "스터디가 Free로 오픈되었습니다.");
      setIsRefetch(true);
      setIsModal(false);
    },
    onError: errorToast,
  });
  return (
    <ModalLeyou size="sm">
      <ModalHeaderX title="Free 오픈 신청" setIsModal={setIsModal} />
      <ModalMain>
        규칙에 상관없이 자유롭게 참여할 수 있고, 스터디 출석 리워드도 그대로
        받을 수 있습니다.
      </ModalMain>
      <ModalFeeterTwe
        right="오픈"
        setIsModal={setIsModal}
        onSubmit={() => openFree(placeId as string)}
      />
    </ModalLeyou>
  );
}

export default StudyFreeOpenModal;
