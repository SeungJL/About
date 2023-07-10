import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
  ModalXXL,
} from "../../../styles/layout/modal";
import {
  StudyRuleModalContentFirstOne,
  StudyRuleModalContentFirstThree,
  StudyRuleModalContentFirstTwo,
  StudyRuleModalContentSecond,
} from "./StudyRuleModalContents";

interface IStudyRuleModal {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

function StudyRuleModal({ setIsModal }: IStudyRuleModal) {
  const [isTip, setIsTip] = useState(true);

  return (
    <Layout>
      <ModalHeaderCenter>
        <Title>동아리 가이드</Title>
        <div>대학생들의 카공 및 친목 동아리 About</div>
      </ModalHeaderCenter>
      <Nav>
        <Button isSelected={isTip} onClick={() => setIsTip(true)}>
          스터디 규칙
        </Button>
        <Button isSelected={!isTip} onClick={() => setIsTip(false)}>
          이용 필독
        </Button>
      </Nav>
      <ModalMain>
        {!isTip ? (
          <SecondPage>
            <RuleTitle>Do you know ?</RuleTitle>
            <StudyRuleModalContentSecond />
          </SecondPage>
        ) : (
          <>
            <Section>
              <RuleTitle>스터디 오픈</RuleTitle>
              <StudyRuleModalContentFirstOne />
            </Section>
            <Section>
              <RuleTitle>스터디 진행</RuleTitle>
              <StudyRuleModalContentFirstTwo />
            </Section>
            <Section>
              <RuleTitle>기타</RuleTitle>
              <StudyRuleModalContentFirstThree />
            </Section>
          </>
        )}
      </ModalMain>
      <ModalFooterNav>
        <button onClick={() => setIsModal(false)}>확인</button>
      </ModalFooterNav>
    </Layout>
  );
}

const Section = styled.section``;

const Layout = styled(ModalXXL)`
  display: flex;
  flex-direction: column;
  color: var(--font-h2);
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

const SecondPage = styled.div`
  line-height: 2;
  > div:last-child {
    > ul {
      > li {
        margin-bottom: var(--margin-min);
      }
    }
  }
`;

export default StudyRuleModal;

{
  /* <RuleTitle>스터디 벌금</RuleTitle>
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
</Content> */
}
