import { useState } from "react";
import { ModalLayout } from "../../Modals";

import { IModal } from "../../../types2/reactTypes";
import GatherParticipateModalApply from "./GatherParticipateModalApply";
import GatherParticipateModalParticipate from "./GatherParticipateModalParticipate";
import GatherParticipateModalPassword from "./GatherParticipateModalPassword";

function GatherParticipateModal({ setIsModal }: IModal) {
  const [pageNum, setPageNum] = useState(0);

  return (
    <ModalLayout title="참여 신청" setIsModal={setIsModal}>
      <>
        {pageNum === 0 ? (
          <GatherParticipateModalApply setPageNum={setPageNum} />
        ) : pageNum === 1 ? (
          <GatherParticipateModalPassword setPageNum={setPageNum} />
        ) : (
          <GatherParticipateModalParticipate setIsModal={setIsModal} />
        )}
      </>
    </ModalLayout>
  );
}

export default GatherParticipateModal;
