import { useState } from "react";
import { ModalHeaderX } from "../../../components/modals/ModalComponents";
import { ModalLeyou } from "../../../components/modals/Modals";

import { ModalMain } from "../../../styles/layout/modal";
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
    <ModalLeyou size="md">
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
    </ModalLeyou>
  );
}

export default GatherParticipateModal;
