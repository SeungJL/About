import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
  ModalMd,
} from "../../styles/layout/modal";

interface IFriendRuleModal {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

function FriendRuleModal({ setIsModal }: IFriendRuleModal) {
  return (
    <Layout>
      <Wrapper layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalHeaderCenter>
          <Title>친구 페이지</Title>
        </ModalHeaderCenter>
        <ModalMain>
          해당 페이지는 다른 컨텐츠 제작 이전에 필요하여 임시적으로 만들어 놓은
          베타 서비스입니다. 지속적으로 보완할 수 있도록 하겠습니다.
        </ModalMain>
        <ModalFooterNav>
          <button onClick={() => setIsModal(false)}>확인</button>
        </ModalFooterNav>
      </Wrapper>
    </Layout>
  );
}

const Layout = styled(ModalMd)`
  display: flex;
  flex-direction: column;
  color: #565b67;
`;
const Wrapper = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: var(--font-h1);
  margin-bottom: 8px;
`;

export default FriendRuleModal;
