import { SetStateAction } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/layouts/Modals";
import { ModalLg } from "../../../styles/layout/modal";
import { IRegisterForm } from "../../../types/user";
import CheckRegisterModalDetail from "./CheckRegisterModalDetail";
import CheckRegisterModalFooter from "./CheckRegisterModalFooter";

interface ICheckRegisterModal {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  applicant: IRegisterForm;
  setIsRefetch: React.Dispatch<SetStateAction<boolean>>;
}

function CheckRegisterModal({
  setIsModal,
  applicant,
  setIsRefetch,
}: ICheckRegisterModal) {
  return (
    <Layout>
      <ModalHeaderX title={applicant?.name} setIsModal={setIsModal} />
      <CheckRegisterModalDetail applicant={applicant} />
      <CheckRegisterModalFooter
        setIsModal={setIsModal}
        setIsRefetch={setIsRefetch}
        uid={applicant?.uid}
      />
    </Layout>
  );
}

const Layout = styled(ModalLg)``;

export default CheckRegisterModal;
