import styled from "styled-components";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLg } from "../../../styles/layout/modal";
import { IModal, IRefetch } from "../../../types/reactTypes";
import { IRegisterForm } from "../../../types/user";
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
    <Layout>
      <ModalHeaderX title={applicant.name} setIsModal={setIsModal} />
      <CheckRegisterModalDetail applicant={applicant} />
      <CheckRegisterModalFooter
        setIsModal={setIsModal}
        setIsRefetch={setIsRefetch}
        uid={applicant.uid}
      />
    </Layout>
  );
}

const Layout = styled(ModalLg)``;

export default CheckRegisterModal;
