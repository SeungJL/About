import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
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
      <ModalLayout size="md">
        <ModalHeaderX title="모집 종료" setIsModal={setIsModal} />
        <Nav>
          <Button
            color="white"
            backgroundColor="var(--color-mint)"
            marginBottom="var(--margin-main)"
            size="lg"
            onClick={() => setModal("expire")}
          >
            모집 마감
          </Button>
          <Button onClick={() => setModal("cancel")} size="lg">
            모임 취소
          </Button>
        </Nav>
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
