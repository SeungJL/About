import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { transferGroupStudyDataState } from "../../../recoil/transferDataAtoms";

function Participate() {
  const groupStudy = useRecoilValue(transferGroupStudyDataState);

  const [questionText, setQuestionText] = useState("");
  console.log(groupStudy);
  const onClick = () => {};

  return (
    <PageLayout>
      <Header title="" url="back" />
      <RegisterLayout>
        <RegisterOverview>
          <span>모임장의 승인이 필요한 모임입니다!</span>
          <span>모임장이 설정한 질문에 답변해주세요.</span>
        </RegisterOverview>
        <Container>
          <AnswerText
            placeholder="제목"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          {/* <Guide
            placeholder="간단하게 작성해주세요."
            value={guide}
            onChange={(e) => setGuide(e.target.value)}
          /> */}
        </Container>
        <BottomNav text="신청" onClick={onClick} />
      </RegisterLayout>
    </PageLayout>
  );
}

const Layout = styled.div``;
const Container = styled.div``;
const AnswerText = styled.textarea`
  margin-top: var(--margin-max);
  padding-left: var(--padding-min);
  border: var(--border-main);
  width: 100%;
  height: 40px;
  background-color: inherit;
  outline: none;
  font-size: 15px;
  font-weight: 600;
  ::placeholder {
    color: var(--font-h4);
  }
`;

export default Participate;
