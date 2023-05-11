import styled from "styled-components";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
  ModalXXL,
} from "../../styles/layout/modal";
import { ModalFooter } from "@chakra-ui/react";

function StoreRuleModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [isTip, setIsTip] = useState(true);

  return (
    <Layout>
      <Wrapper layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalHeaderCenter>
          <Title>포인트 추첨</Title>
          <div>
            동아리 활동을 통해 적립한 포인트로 추첨에 응모해보세요! 매번 다양한
            상품들이 준비되어 있습니다!
          </div>
        </ModalHeaderCenter>

        <ModalMain>
          <RuleTitle>포인트는 어떻게 얻어요?</RuleTitle>
          <Content>
            <ul>
              <li>
                스터디에 참여하거나, 이벤트, 건의, 홍보 등을 통해 포인트를
                흭득할 수 있어요!
              </li>
            </ul>
          </Content>
          <RuleTitle>응모는 어떤 걸 하는 게 좋나요?</RuleTitle>
          <Content>
            <ul>
              <li>
                모든 상품의 기대 가성비는 거의 동일해요! 머리 아프게 고민하지
                말고 정말 원하시는 아무거나 응모하시면 됩니다!
              </li>
            </ul>
          </Content>
          <RuleTitle>상품 마다 인원수가 있는 건 뭔가요?</RuleTitle>
          <Content>
            <ul>
              <li>
                예측 가능한 당첨이 될 수 있도록 최대 응모 횟수와 당첨 숫자를
                제한하고 있어요. 트로피의 숫자는 당첨 개수이고, 아래의 숫자는
                현재 응모 인원과 최대 응모 가능 인원이에요!
              </li>
            </ul>
          </Content>
          <RuleTitle>결과 발표는 언제인가요?</RuleTitle>
          <Content>
            <ul>
              <li>
                응모 인원의 수가 모두 충족되면 결과가 발표돼요! 하지만 최대
                마감일을 지나게 되면, 응모 인원과 상관없이 현재 응모한 인원
                중에서 당첨자를 뽑게 됩니다!
              </li>
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

export default StoreRuleModal;
