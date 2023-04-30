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

function StudyRuleModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
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
              <RuleTitle>기능</RuleTitle>
              <Content>
                <ol>
                  <Li>
                    투표 날짜를 이동할 때 좌우 <b>스와이핑</b>으로 이동 가능
                  </Li>
                  <Li>
                    <b>마이페이지</b>에서 건의, 프로필, Comment 등의 수정 기능
                  </Li>
                  <Li>투표 및 출석체크는 메인 화면에서도 가능</Li>
                </ol>
              </Content>
              <RuleTitle>시스템</RuleTitle>
              <Content>
                <ol>
                  <Li>
                    스터디는 알고리즘을 통해 <b>오후 10시</b>에 결과 확정
                  </Li>

                  <li>
                    <b> 3명 이상의 인원이 1시간 이상 참여시간이 겹치는 경우</b>
                    에만 스터디가 열려요! 다른 사람들이 투표 안하면 어떡하지?
                    라는 걱정없이 먼저 투표해주셔도 좋습니다!
                  </li>
                  <Li>내 스터디 결과가 확정된 경우에만 출석하면 됩니다</Li>
                  <Li>
                    <b>시작 시간 이전까지는</b> 참여 시간을 변경해도 경고 없음
                  </Li>
                  <Li>
                    <b>당일 참여</b>를 통해 당일에도 참여 가능(0.5회만 반영)
                  </Li>
                </ol>
              </Content>
            </>
          ) : (
            <>
              <RuleTitle>스터디 벌금</RuleTitle>
              <Content>
                <ul>
                  <li>
                    1시간 이상 지각 <B> -300원</B>
                  </li>
                  <li>
                    스터디 당일 불참 <B>-600원</B>
                  </li>
                  <li>
                    스터디 당일 잠수 <B> -1000원</B>
                  </li>
                  <li>
                    한 달에 2번 미만 참여 <B> -1000원 </B>(회 당)
                  </li>
                  <li>가입한 달에는 참여 정산 벌금 x</li>
                  <li>보유중인 보증금은 회원탈퇴시 자동 환급</li>
                </ul>
              </Content>
              <RuleTitle>휴식 관련</RuleTitle>
              <Content>
                <ul>
                  <li>일반 휴식(6개월 기준): 최대 2달</li>
                  <li>장기 휴식: 별도 연락</li>
                  <li>언급한 다음 달 부터 휴식처리</li>
                </ul>
              </Content>

              <RuleTitle>추가 규칙</RuleTitle>
              <Content>
                <ul>
                  <li>
                    다른 사람에게 피해를 주거나 불쾌감을 주는 행위는 강제 추방될
                    수 있음 (마이페이지 &rarr; 불편 사항 신고)
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

export default StudyRuleModal;
