import { SetStateAction } from "react";
import styled from "styled-components";
import { ModalMd } from "../../styles/layout/modal";

function SettingStudySpace({
  setIsModal,
  isBig,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  isBig: boolean;
}) {
  return <Layout></Layout>;
}

const Layout = styled(ModalMd)``;

export default SettingStudySpace;
