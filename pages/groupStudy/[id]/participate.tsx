import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageSlide from "../../../components/layout/PageSlide";
import ParticipateModal from "../../../pageTemplates/groupStudy/ParticipateModal";
import RegisterLayout from "../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../pageTemplates/register/RegisterOverview";
import { transferGroupStudyDataState } from "../../../recoil/transferDataAtoms";

function Participate() {
  const groupStudy = useRecoilValue(transferGroupStudyDataState);

  const [questionText, setQuestionText] = useState("");
  const [isModal, setIsModal] = useState(false);

  const onClick = () => {
    setIsModal(true);
  };

  return (
    <>
      <PageSlide>
        <Header title="" url="back" />
        <RegisterLayout>
          <RegisterOverview>
            {groupStudy?.questionText ? (
              <>
                <span>모임장의 승인이 필요한 모임입니다!</span>
                <span>모임장이 설정한 질문에 답변해주세요.</span>
              </>
            ) : (
              <>
                <span>자유 가입으로 설정된 모임입니다!</span>
                <span>바로 가입이 가능해요.</span>
              </>
            )}
          </RegisterOverview>
          <Container>
            {groupStudy?.questionText && (
              <Item>
                <Title>Q&#41; {groupStudy?.questionText}</Title>
                <AnswerText
                  placeholder="부담없이 작성해주세요!"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
              </Item>
            )}
          </Container>
          <BottomNav text="가입 신청" onClick={onClick} />
        </RegisterLayout>
      </PageSlide>
      {isModal && (
        <ParticipateModal
          isFree={!questionText}
          answer={questionText}
          id={groupStudy.id}
          fee={groupStudy.fee}
          feeText={groupStudy.feeText}
          setIsModal={setIsModal}
        />
      )}
    </>
  );
}

const Container = styled.div`
  margin-top: var(--margin-max);
`;

const Item = styled.div``;

const AnswerText = styled.textarea`
  border-radius: var(--border-radius2);

  border: var(--border-main);
  width: 100%;
  padding: var(--padding-md);

  :focus {
    outline-color: var(--font-h1);
  }
`;

const Title = styled.div`
  font-size: 15px;
  margin-bottom: var(--margin-main);
`;

export default Participate;
