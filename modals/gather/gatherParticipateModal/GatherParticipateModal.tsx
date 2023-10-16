import { useState } from "react";
import { ModalHeader, ModalLayout } from "../../../components/modals/Modals";

import { IModal, IRefetch } from "../../../types/reactTypes";
import GatherParticipateModalApply from "./GatherParticipateModalApply";
import GatherParticipateModalParticipate from "./GatherParticipateModalParticipate";
import GatherParticipateModalPassword from "./GatherParticipateModalPassword";

function GatherParticipateModal({
  setIsModal,
  setIsRefetch,
}: IModal & IRefetch) {
  const [pageNum, setPageNum] = useState(0);

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="sm">
      <ModalHeader text="참여신청" />
      <>
        {pageNum === 0 ? (
          <GatherParticipateModalApply setPageNum={setPageNum} />
        ) : pageNum === 1 ? (
          <GatherParticipateModalPassword setPageNum={setPageNum} />
        ) : (
          <GatherParticipateModalParticipate
            setIsModal={setIsModal}
            setIsRefetch={setIsRefetch}
          />
        )}
      </>
    </ModalLayout>
  );
}

export default GatherParticipateModal;
