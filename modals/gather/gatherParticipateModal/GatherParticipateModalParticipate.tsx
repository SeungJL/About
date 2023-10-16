import { useRouter } from "next/router";
import { ModalBody, ModalBodyNavTwo } from "../../../components/modals/Modals";
import { useCompleteToast, useErrorToast } from "../../../hooks/CustomToast";
import { useGatherParticipateMutation } from "../../../hooks/gather/mutations";
import { IModal, IRefetch } from "../../../types/reactTypes";

function GatherParticipateModalParticipate({
  setIsModal,
  setIsRefetch,
}: IModal & IRefetch) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const router = useRouter();
  const gatherId = +router.query.id;

  const { mutate: participate } = useGatherParticipateMutation(gatherId, {
    onSuccess() {
      setIsRefetch(true);
      completeToast("free", "참여 완료!");
    },
    onError: errorToast,
  });

  const selectGatherTime = (time: "first" | "second") => {
    participate(time);
    setIsModal(false);
  };

  return (
    <ModalBody>
      <ModalBodyNavTwo
        topText="1차 참여 신청"
        bottomText="2차 참여 신청"
        onClickTop={() => selectGatherTime("first")}
        onClickBottom={() => selectGatherTime("second")}
      />
    </ModalBody>
  );
}

export default GatherParticipateModalParticipate;
