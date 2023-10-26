import { ModalHeader, ModalLayout } from "../../../components/modals/Modals";
import { IModal, IRefetch } from "../../../types/reactTypes";
import { IRegisterForm } from "../../../types/user/user";
import CheckRegisterModalDetail from "./CheckRegisterModalDetail";
import CheckRegisterModalFooter from "./CheckRegisterModalFooter";

interface ICheckRegisterModal extends IModal, IRefetch {
  applicant: IRegisterForm;
}

function CheckRegisterModal({
  setIsModal,
  applicant,
  setIsRefetch,
}: ICheckRegisterModal) {
  if (!applicant) return null;
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader text={applicant.name} />
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
