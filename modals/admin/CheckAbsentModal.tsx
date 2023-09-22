import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";

import { ModalLayout } from "../../components/modals/Modals";
import { useAdminDepositMutation } from "../../hooks/admin/mutation";
import { useCompleteToast, useErrorToast } from "../../hooks/CustomToast";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

interface ICheckAbsentModal extends IModal {
  uid: string;
  fee: number;
}

function CheckAbsentModal({ uid, fee, setIsModal }: ICheckAbsentModal) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const { mutate } = useAdminDepositMutation(uid, {
    onSuccess() {
      completeToast(
        "free",
        "성공적으로 처리되었습니다. 중복해서 처리하지 않도록 주의해주세요!"
      );
      setIsModal(false);
    },
    onError: errorToast,
  });

  const onClick = () => {
    mutate({ value: fee, message: "불참 인정으로 인한 벌금 면제" });
  };

  return (
    <ModalLayout size="md" height={180}>
      <ModalHeaderX title="불참 인정" setIsModal={setIsModal} />
      <ModalMain>
        해당 유저의 불참을 인정합니다. 벌금이 면제됩니다. 남용하지는 말아주세요!
      </ModalMain>
      <ModalFooterNav>
        <button>닫기</button>
        <button onClick={onClick}>인정</button>
      </ModalFooterNav>
    </ModalLayout>
  );
}

const Layout = styled.div``;

export default CheckAbsentModal;
