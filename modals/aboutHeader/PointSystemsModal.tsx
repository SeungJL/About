import { useState } from "react";
import styled from "styled-components";
import { ModalLayout } from "../../components/modals/Modals";
import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
} from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import PointSystemsModalPoint from "./pointSystemsModal/PointSystemsModalPoint";

function PointSystemsModal({ setIsModal }: IModal) {
  const [isTip, setIsTip] = useState(true);

  return (
    <ModalLayout size="xxl">
      <ModalHeaderCenter>
        <Title>동아리 가이드</Title>
        <div>대학생들의 카공 및 친목 동아리 About</div>
      </ModalHeaderCenter>
      <Nav>
        <Button isSelected={isTip} onClick={() => setIsTip(true)}>
          ABOUT 포인트
        </Button>
        <Button isSelected={!isTip} onClick={() => setIsTip(false)}>
          스터디 벌금
        </Button>
      </Nav>
      <ModalMain>
        {isTip ? (
          <PointSystemsModalPoint />
        ) : (
          <>
            <Item>
              <RuleTitle>스터디 오픈</RuleTitle>
            </Item>
            <Item>
              <RuleTitle>스터디 진행</RuleTitle>
            </Item>
            <Item>
              <RuleTitle>기타</RuleTitle>
            </Item>
          </>
        )}
      </ModalMain>
      <ModalFooterNav>
        <button onClick={() => setIsModal(false)}>확인</button>
      </ModalFooterNav>
    </ModalLayout>
  );
}

const Item = styled.div``;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: var(--font-h1);
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
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

const RuleTitle = styled.span`
  color: var(--font-h1);
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: var(--margin-min);
`;

export default PointSystemsModal;
