import { ModalHeader, ModalLayout } from "../../../components/modals/Modals";
import { IModal, IRefetch } from "../../../types/reactTypes";
import { IUserRegisterForm } from "../../../types/user/user";
import CheckRegisterModalDetail from "./CheckRegisterModalDetail";
import CheckRegisterModalFooter from "./CheckRegisterModalFooter";

interface ICheckRegisterModal extends IModal, IRefetch {
  applicant: IUserRegisterForm;
}

function CheckRegisterModal({
  setIsModal,
  applicant,
  setIsRefetch,
}: ICheckRegisterModal) {
  if (!applicant) return null;
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader text={applicant.name || "정보없음"} />
      <CheckRegisterModalDetail applicant={applicant} />
      <CheckRegisterModalFooter
        setIsModal={setIsModal}
        setIsRefetch={setIsRefetch}
        uid={applicant.uid}
      />
    </ModalLayout>
  );
}

export default CheckRegisterModal;
