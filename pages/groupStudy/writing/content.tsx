import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { sharedGroupStudyWritingState } from "../../../recoil/sharedDataAtoms";

function GroupStudyWritingContent() {
  const router = useRouter();
  const failToast = useFailToast();

  const [groupStudy, setGroupStudy] = useRecoilState(
    sharedGroupStudyWritingState
  );

  //초기 input 세팅

  const [content, setContent] = useState(groupStudy?.content || "");

  const onClickNext = () => {
    if (!content) {
      failToast("free", "내용을 작성해 주세요!", true);
      return;
    }

    setGroupStudy((old) => ({
      ...old,

      content,
    }));
    router.push(`/groupStudy/writing/period`);
  };

  return (
    <PageLayout>
      <ProgressStatus value={56} />
      <Header title="" url="/groupStudy/writing/guide" />
      <RegisterLayout>
        <RegisterOverview>
          <span>어떤 모임인지 작성해주세요!</span>
          <span>가입 이전에 어떤 활동과 방식의 모임인지 알 수 있어야 해요</span>
        </RegisterOverview>
        <Container>
          <Content
            placeholder="내용을 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Container>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </PageLayout>
  );
}

const Container = styled.div``;

const TitleInput = styled.input`
  margin-top: var(--margin-max);
  border-bottom: var(--border-thick);
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

const Content = styled.textarea`
  margin-top: 40px;
  border: var(--border-main);
  border-radius: var(--border-radius-sub);
  height: 200px;
  width: 100%;
  padding: var(--padding-sub);
  font-size: 12px;
  :focus {
    outline: none;
    border: var(--border-focus);
  }
`;

export default GroupStudyWritingContent;
