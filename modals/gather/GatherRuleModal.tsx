import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
  ModalXXL,
} from "../../styles/layout/modal";

function GatherRuleModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Layout>
      <Wrapper layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalHeaderCenter>
          <Title>모임 게시판</Title>
          <div>
            다양한 주제의 번개를 개설하거나 참여할 수 있어요! 재밌는 모임을 찾아
            함께 떠나볼까요~!
          </div>
        </ModalHeaderCenter>

        <ModalMain>
          <RuleTitle>ABOUT 모임 게시판은 어떤게 다르나요?</RuleTitle>
          <Content>
            <ul>
              <li>
                누구나 모임을 개설할 수 있어요! 날짜와 장소, 주제를 선택해서
                모임을 열어봐요!
              </li>
              <li>필요한 내용들을 형식화해서 쉽게 모임을 열 수 있어요!</li>
              <li>
                주제, 장소, 참여시간, 진행방식 등의 요소들을 한 눈에 볼 수
                있어서 따로 고민하거나 설명하지 않아도 진행이 간단해요!
              </li>
              <li>
                같은 동아리여도 초면인 사람들이 많아서 모임에 나가기가 고민될 수
                있어요! 인원 수, 성별, 나이 등을 고려하여 참여자를 받을 수
                있어서 새로운 만남에 대한 부담이 적어요!
              </li>
            </ul>
          </Content>
          <RuleTitle>모임 개설자 필독</RuleTitle>
          <Content>
            <ul>
              <li>카카오톡 공유를 통해 모임글을 공지 톡방에 올려주세요!</li>
              <li>모임이 확정되면 인원들과 단톡방을 만들어주세요!</li>
              <li>
                모임 취소는 신청자가 없는 경우 완전히 삭제되고, 신청자가 있는
                경우에는 취소 상태로 변경됩니다.
              </li>
              <li>모임 진행시 간단한 인증 사진을 찍어주세요!</li>
            </ul>
          </Content>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>확인</button>
        </ModalFooterNav>
      </Wrapper>
    </Layout>
  );
}

const Layout = styled(ModalXXL)`
  display: flex;
  flex-direction: column;

  color: #565b67;
`;
const Wrapper = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: var(--font-h1);
  margin-bottom: 8px;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  margin-top: 8px;
`;

const Button = styled.button<{ isSelected: boolean }>`
  flex: 1;
  font-weight: 600;
  font-size: 12px;
  padding-bottom: 6px;
  color: var(--font-h1);
  border-bottom: ${(props) =>
    props.isSelected ? "2px solid var(--font-h1)" : "1px solid var(--font-h6)"};
`;

const RuleTitle = styled.span`
  color: var(--font-h1);
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 2px;
`;

const Main = styled.main`
  margin-top: 8px;
`;
const Content = styled.div`
  font-size: 11px;
  padding-left: 16px;
  margin-top: 3px;
  margin-bottom: 8px;
  > ul {
    line-height: 1.8;
  }
`;

const B = styled.b`
  margin-left: 3px;
  color: var(--font-h1);
`;

const Footer = styled.footer`
  display: flex;
  justify-content: end;
  align-items: end;
  flex: 1;

  > button {
    color: var(--font-h1);
    font-size: 16px;
  }
`;
const Li = styled.li`
  line-height: 2;
  > b {
    color: var(--font-h1);
  }
`;

export default GatherRuleModal;
