import { Button } from "@chakra-ui/react";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { IModal } from "../../types/reactTypes";

interface IModalHeader extends IModal {
  title: string;
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
    font-weight: 700;
    color: var(--font-h1);
  }
`;

interface IModalFooterTwo extends IModal {
  left?: string;
  right: string;
  onSubmit: () => void;
}

export const ModalFooterTwo = ({
  left = "닫기",
  right,
  setIsModal,
  onSubmit,
}: IModalFooterTwo) => (
  <ModalFooterTwoLayout>
    <Button onClick={() => setIsModal(false)}>{left}</Button>
    <Button onClick={onSubmit} colorScheme="mintTheme">
      {right}
    </Button>
  </ModalFooterTwoLayout>
);

const ModalFooterTwoLayout = styled.div`
  display: flex;
  > button {
    flex: 1;
  }
`;