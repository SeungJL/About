import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface IModalHeader {
  title: string;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalHeader = ({ title, setIsModal }: IModalHeader) => (
  <ModalHeaderLayout>
    <span>{title}</span>
    <div onClick={() => setIsModal(false)}>
      <FontAwesomeIcon icon={faXmark} size="lg" color="var(--font-h2)" />
    </div>
  </ModalHeaderLayout>
);

const ModalHeaderLayout = styled.div`
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
