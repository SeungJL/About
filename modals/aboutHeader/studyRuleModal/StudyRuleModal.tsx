import { useState } from "react";
import styled from "styled-components";
import { ModalLayout } from "../../../components/common/modal/Modals";

import {
  ModalFooterNav,
  ModalHeaderCenter,
  ModalMain,
} from "../../../styles/layout/modal";
import { IModal } from "../../../types/common";
import {
  StudyRuleModalContentFirstOne,
  StudyRuleModalContentFirstThree,
  StudyRuleModalContentFirstTwo,
  StudyRuleModalContentSecondFee,
  StudyRuleModalContentSecondTip,
} from "./StudyRuleModalContents";

function StudyRuleModal({ setIsModal }: IModal) {
  const [isTip, setIsTip] = useState(true);

  return (
    <ModalLayout size="xl">
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
          <>
            <Item>
              <RuleTitle>스터디 벌금</RuleTitle>
              <StudyRuleModalContentSecondFee />
            </Item>
            <Item>
              <RuleTitle>이용 Tip</RuleTitle>
              <StudyRuleModalContentSecondTip />
            </Item>
          </>
        ) : (
          <>
            <Item>
              <RuleTitle>스터디 오픈</RuleTitle>
              <StudyRuleModalContentFirstOne />
            </Item>
            <Item>
              <RuleTitle>스터디 진행</RuleTitle>
              <StudyRuleModalContentFirstTwo />
            </Item>
            <Item>
              <RuleTitle>기타</RuleTitle>
              <StudyRuleModalContentFirstThree />
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
