import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface IModalHeader {
  title: string;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalHeaderX = ({ title, setIsModal }: IModalHeader) => (
  <ModalHeaderXLayout>
    <span>{title}</span>
    <div onClick={() => setIsModal(false)}>
      <FontAwesomeIcon icon={faXmark} size="lg" color="var(--font-h2)" />
    </div>
  </ModalHeaderXLayout>
);

const ModalHeaderXLayout = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    font-size: 16px;
    font-weight: 600;
    color: var(--font-h1);
  }
  > div {
    margin-right: 2px;
  }
`;

export const ModalHeaderXLine = ({ title, setIsModal }: IModalHeader) => (
  <ModalHeaderXLineLayout>
    <span>{title}</span>
    <div onClick={() => setIsModal(false)}>
      <FontAwesomeIcon icon={faXmark} size="lg" color="var(--font-h2)" />
    </div>
  </ModalHeaderXLineLayout>
);
const ModalHeaderXLineLayout = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 12px;
  border-bottom: var(--border-headline);
  > span {
    font-size: 16px;
    font-weight: 600;
    color: var(--font-h1);
  }
  > div {
    margin-right: 2px;
  }
`;
