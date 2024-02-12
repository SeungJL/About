import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageSlide from "../../../components/layout/PageSlide";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../pageTemplates/register/RegisterOverview";
import { sharedGatherWritingState } from "../../../recoil/sharedDataAtoms";

function WritingGatherContent() {
  const router = useRouter();
  const failToast = useFailToast();

  const [gatherWriting, setGatherWriting] = useRecoilState(
    sharedGatherWritingState
  );

  //초기 input 세팅
  const [title, setTitle] = useState(gatherWriting?.title || "");
  const [content, setContent] = useState(gatherWriting?.content || "");

  const onClickNext = () => {
    if (!title || !content) {
      failToast("free", "내용을 작성해 주세요!", true);
      return;
    }

    setGatherWriting((old) => ({
      ...old,
      title,
      content,
    }));
    router.push(`/gather/writing/date`);
  };

  return (
    <PageSlide>
      <ProgressStatus value={40} />
      <Header title="" url="/gather/writing/category" />
      <RegisterLayout>
        <RegisterOverview>
          <span>내용을 입력해 주세요.</span>
        </RegisterOverview>
        <Container>
          <TitleInput
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Content
            placeholder="소개글을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Container>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </PageSlide>
  );
}

const Container = styled.div``;

const TitleInput = styled.input`
  margin-top: var(--margin-max);
  border-bottom: var(--border-thick);
  width: 100%;
  padding-left: var(--padding-min);
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

export default WritingGatherContent;
