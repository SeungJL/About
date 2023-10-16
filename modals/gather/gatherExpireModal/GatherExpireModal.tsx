import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalBodyNavTwo,
  ModalHeader,
  ModalLayout,
} from "../../../components/modals/Modals";
import { transferGatherDataState } from "../../../recoil/transferDataAtoms";
import { ModalMain } from "../../../styles/layout/modal";
import { IModal, IRefetch } from "../../../types/reactTypes";
import GatherExpireModalCancelDialog from "./GatherExpireModalCancelDialog";
import GatherExpireModalExpireDialog from "./GatherExpireModalExpireDialogs";

export type GatherExpireModalDialogType = "expire" | "cancel";

function GatherExpireModal({ setIsModal, setIsRefetch }: IModal & IRefetch) {
  const gatherData = useRecoilValue(transferGatherDataState);

  const [modal, setModal] = useState<GatherExpireModalDialogType>();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isComplete) return;
    setIsRefetch(true);
    setIsModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="sm">
        <ModalHeader text="모집 종료" />
        <ModalBody>
          <ModalBodyNavTwo
            topText="모집 마감"
            bottomText="모임 취소"
            onClickTop={() => setModal("expire")}
            onClickBottom={() => setModal("cancel")}
          />
        </ModalBody>
      </ModalLayout>
      <GatherExpireModalExpireDialog
        setIsComplete={setIsComplete}
        modal={modal}
      />
      <GatherExpireModalCancelDialog
        setIsComplete={setIsComplete}
        modal={modal}
        isNoMember={gatherData.participants.length === 0}
      />
    </>
  );
}

const Nav = styled(ModalMain)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default GatherExpireModal;
