import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
  ModalXXL,
} from "../../styles/layout/modal";

interface IStudyRuleModal {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

function StudyRuleModal({ setIsModal }: IStudyRuleModal) {
  const [isTip, setIsTip] = useState(true);

  return (
    <Layout>
      <Wrapper layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalHeaderCenter>
          <Title>동아리 규칙</Title>
          <div>대학생들의 카공 및 친목 동아리 About</div>
        </ModalHeaderCenter>
        <Nav>
          <Button isSelected={isTip} onClick={() => setIsTip(true)}>
            스터디 규칙
          </Button>
          <Button isSelected={!isTip} onClick={() => setIsTip(false)}>
            이용 꿀 Tip
          </Button>
        </Nav>

        <ModalMain>
          {!isTip ? (
            <>
              <RuleTitle>Do you know ?</RuleTitle>
              <Content>
                <ul>
                  <li>
                    날짜 이동할 때 좌우 <b>스와이핑</b>으로 이동 가능
                  </li>
                  <li>
                    <b>마이페이지</b>에 생각보다 다양한 기능이 존재합니다
                  </li>
                  <li>내 스터디 결과가 확정된 경우에만 출석하면 됩니다</li>
                  <li>
                    <b>스터디 시작 시간 이전까지는</b> 참여 시간을 변경해도
                    패널티가 없습니다
                  </li>
                  <li>
                    <b>당일 참여</b>를 통해 당일에도 참여 가능합니다
                  </li>
                </ul>
              </Content>
            </>
          ) : (
            <>
              <RuleTitle>스터디 벌금</RuleTitle>
              <Content>
                <ul>
                  <li>
                    1시간 이상 지각 <B> -200</B>
                  </li>
                  <li>
                    스터디 당일 불참<B>-500</B> / 스터디 시작 이전
                    <B>-300</B>
                  </li>
                </ul>
              </Content>
              <RuleTitle>월간 참여 정산</RuleTitle>
              <Content>
                <ul>
                  <li>
                    한 달에 <b>최소 1회</b> 참여 (투표만 해도 <b>0.5회</b>
                    &nbsp;인정)
                  </li>
                  <li>
                    <b>0.5회</b> 기준 벌금 <B>-1000</B>
                  </li>

                  <li>가입한 달에는 참여 정산 벌금 x</li>
                </ul>
              </Content>
              <RuleTitle>기타</RuleTitle>
              <Content>
                <ul>
                  <li>마이페이지에서 휴식 신청 가능</li>
                  <li>보유중인 보증금은 회원탈퇴시 자동 환급</li>
                </ul>
              </Content>
              <RuleTitle>★ 중요 ★</RuleTitle>
              <Content>
                <ul>
                  <li>
                    다른 인원에게 피해를 끼치는 행위를 엄격하게 금지합니다. 이는
                    사적인 연락도 포함입니다. 불편한 연락이나 상황이 있다면
                    고민하지 말고 관리자에게 연락해주세요.
                  </li>
                </ul>
              </Content>
            </>
          )}
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

export default StudyRuleModal;
