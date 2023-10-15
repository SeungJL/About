import { ModalHeaderX } from "../../../components/modals/ModalComponents";
import { ModalLeyou } from "../../../components/modals/Modals";
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
    <ModalLeyou size="xl">
      <ModalHeaderX title={applicant.name} setIsModal={setIsModal} />
      <CheckRegisterModalDetail applicant={applicant} />
      <CheckRegisterModalFooter
        setIsModal={setIsModal}
        setIsRefetch={setIsRefetch}
        uid={applicant.uid}
      />
    </ModalLeyou>
  );
}

export default CheckRegisterModal;
