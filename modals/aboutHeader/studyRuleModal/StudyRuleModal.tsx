import { useState } from "react";
import styled from "styled-components";
import { IModal } from "../../../types/reactTypes";

function StudyRuleModal({ setIsModal }: IModal) {
  const [isTip, setIsTip] = useState(true);

  return null;
  // <ModalLayout onClose={() => setIsModal(false)} size="xxl">
  //   <ModalHeaderCenter>
  //     <Title>동아리 가이드</Title>
  //     <div>대학생들의 카공 및 친목 동아리 About</div>
  //   </ModalHeaderCenter>
  //   <Nav>
  //     <Button isSelected={isTip} onClick={() => setIsTip(true)}>
  //       스터디 규칙
  //     </Button>
  //     <Button isSelected={!isTip} onClick={() => setIsTip(false)}>
  //       이용 필독
  //     </Button>
  //   </Nav>
  //   <ModalBody>
  //     {!isTip ? (
  //       <>
  //         <Item>
  //           <RuleTitle>스터디 벌금</RuleTitle>
  //           <StudyRuleModalContentSecondFee />
  //         </Item>
  //         <Item>
  //           <RuleTitle>이용 Tip</RuleTitle>
  //           <StudyRuleModalContentSecondTip />
  //         </Item>
  //       </>
  //     ) : (
  //       <>
  //         <Item>
  //           <RuleTitle>스터디 오픈</RuleTitle>
  //           <StudyRuleModalContentFirstOne />
  //         </Item>
  //         <Item>
  //           <RuleTitle>스터디 진행</RuleTitle>
  //           <StudyRuleModalContentFirstTwo />
  //         </Item>
  //         <Item>
  //           <RuleTitle>기타</RuleTitle>
  //           <StudyRuleModalContentFirstThree />
  //         </Item>
  //       </>
  //     )}
  //   </ModalBody>
  //   <ModalFooterOne text="확인" onClick={() => setIsModal(false)} />
  // </ModalLayout>
}

const Item = styled.div``;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-1);
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
`;

const Button = styled.button<{ isSelected: boolean }>`
  flex: 1;
  font-weight: 600;
  font-size: 12px;
  padding-bottom: var(--gap-2);
  color: var(--gray-1);
  border-bottom: ${(props) =>
    props.isSelected ? "2px solid var(--gray-1)" : "1px solid var(--gray-6)"};
`;

const RuleTitle = styled.span`
  color: var(--gray-1);
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: var(--gap-1);
`;

export default StudyRuleModal;
