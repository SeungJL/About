import { useState } from "react";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";

import { ModalMain } from "../../../styles/layout/modal";
import { IModal, IRefetch } from "../../../types/common";
import GatherParticipateModalApply from "./GatherParticipateModalApply";
import GatherParticipateModalParticipate from "./GatherParticipateModalParticipate";
import GatherParticipateModalPassword from "./GatherParticipateModalPassword";

function GatherParticipateModal({
  setIsModal,
  setIsRefetch,
}: IModal & IRefetch) {
  const [pageNum, setPageNum] = useState(0);

  return (
    <ModalLayout size="md">
      <ModalHeaderX title="참여신청" setIsModal={setIsModal} />
      <ModalMain>
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
      </ModalMain>
    </ModalLayout>
  );
}

export default GatherParticipateModal;
