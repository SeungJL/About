import { SetStateAction } from "react";
import styled from "styled-components";
import { ModalLg } from "../../styles/layout/modal";
import { IRegisterForm } from "../../types/user";

function CheckRegisterModal({
  setIsModal,
  applicant,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  applicant: IRegisterForm;
}) {
  return <Layout></Layout>;
}

const Layout = styled(ModalLg)``;

export default CheckRegisterModal;
