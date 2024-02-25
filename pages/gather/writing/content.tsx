import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Slide from "../../../components/layout/PageSlide";

import Header from "../../../components/layout/Header";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import Input from "../../../components2/atoms/Input";
import Textarea from "../../../components2/atoms/Textarea";
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
    <>
      <Slide isFixed={true}>
        <ProgressStatus value={40} />
        <Header isSlide={false} title="" url="/gather/writing/category" />
      </Slide>
      <RegisterLayout>
        <RegisterOverview>
          <span>내용을 입력해 주세요.</span>
        </RegisterOverview>
        <Container>
          <Input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Box h="20px" />
          <Textarea
            placeholder="소개글을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minHeight={200}
          />
        </Container>
      </RegisterLayout>
      <BottomNav onClick={() => onClickNext()} />
    </>
  );
}

const Container = styled.div``;

const TitleInput = styled.input`
  margin-top: var(--gap-5);
  border-bottom: var(--border-thick);
  width: 100%;
  padding-left: var(--gap-1);
  height: 40px;
  background-color: inherit;
  outline: none;
  font-size: 15px;
  font-weight: 600;
  ::placeholder {
    color: var(--gray-4);
  }
`;

const Content = styled.textarea`
  margin-top: 40px;
  border: var(--border);
  border-radius: var(--rounded-lg);
  height: 200px;
  width: 100%;
  padding: var(--gap-3);
  font-size: 12px;
  :focus {
    outline: none;
    border: var(--border-thick);
  }
`;

export default WritingGatherContent;
