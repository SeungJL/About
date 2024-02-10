import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../pageTemplates/register/RegisterOverview";
import { sharedGroupStudyWritingState } from "../../../recoil/sharedDataAtoms";

function GroupStudyWritingHashTag() {
  const router = useRouter();
  const failToast = useFailToast();

  const [groupStudy, setGroupStudy] = useRecoilState(
    sharedGroupStudyWritingState
  );

  const [text, setText] = useState(groupStudy?.hashTag || "");

  const onClickNext = () => {
    if (!text) {
      failToast("free", "내용을 작성해 주세요!", true);
      return;
    }

    setGroupStudy((old) => ({
      ...old,
      hashTag: text,
    }));
    router.push(`/groupStudy/writing/condition`);
  };

  return (
    <PageLayout>
      <ProgressStatus value={86} />
      <Header title="" url="/groupStudy/writing/period" />
      <RegisterLayout>
        <RegisterOverview>
          <span>모임을 소개할 수 있는 해쉬태그를 달아봐요!</span>
          <span>#을 포함해서 작성해주세요!</span>
        </RegisterOverview>
        <Container>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ex) #코딩 #블로그"
          />
        </Container>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </PageLayout>
  );
}

const Container = styled.div``;

const Input = styled.input`
  margin-top: var(--margin-main);
  padding: var(--padding-md);
  width: 100%;
  border: var(--border-main);
  border-radius: var(--border-radius2);
  :focus {
    outline-color: var(--font-h1);
  }
`;

export default GroupStudyWritingHashTag;
