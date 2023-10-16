import { useState } from "react";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalLayout,
} from "../../../components/modals/Modals";
import { ModalHeaderCenter } from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";
import PointSystemsModalFee from "./PointSystemsModalFee";
import PointSystemsModalPoint from "./PointSystemsModalPoint";

function PointSystemsModal({ setIsModal }: IModal) {
  const [isTip, setIsTip] = useState(true);

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xxl">
      <ModalBody>
        <ModalHeaderCenter>
          <Title>포인트 가이드</Title>
          <div>대학생들의 카공 및 친목 동아리 ABOUT</div>
        </ModalHeaderCenter>
        <Nav>
          <Button isSelected={isTip} onClick={() => setIsTip(true)}>
            ABOUT 포인트
          </Button>
          <Button isSelected={!isTip} onClick={() => setIsTip(false)}>
            스터디 벌금
          </Button>
        </Nav>
        <Wrapper>
          {isTip ? <PointSystemsModalPoint /> : <PointSystemsModalFee />}
        </Wrapper>
      </ModalBody>
      <ModalFooterOne onClick={() => setIsModal(false)} />
    </ModalLayout>
  );
}

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: var(--font-h1);
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
`;

const Wrapper = styled.div`
  height: 100%;

  margin-top: var(--margin-sub);
`;

const Button = styled.button<{ isSelected: boolean }>`
  flex: 1;
  font-weight: 600;
  font-size: 12px;
  padding-bottom: var(--padding-md);
  color: var(--font-h1);
  border-bottom: ${(props) =>
    props.isSelected ? "2px solid var(--font-h1)" : "1px solid var(--font-h6)"};
`;

export default PointSystemsModal;
