import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import Slide from "../../../components/layout/PageSlide";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../pageTemplates/register/RegisterOverview";
import { sharedGroupWritingState } from "../../../recoil/sharedDataAtoms";

function GroupWritingHashTag() {
  const router = useRouter();
  const failToast = useFailToast();

  const [group, setGroup] = useRecoilState(sharedGroupWritingState);

  const [text, setText] = useState(group?.hashTag || "");

  const onClickNext = () => {
    if (!text) {
      failToast("free", "내용을 작성해 주세요!", true);
      return;
    }

    setGroup((old) => ({
      ...old,
      hashTag: text,
    }));
    router.push(`/group/writing/condition`);
  };

  return (
    <>
      <Slide isFixed={true}>
        <ProgressStatus value={86} />
        <Header isSlide={false} title="" url="/group/writing/period" />
      </Slide>
      <Slide>
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
        </RegisterLayout>
      </Slide>
      <Slide isFixed={true} posZero="top">
        <BottomNav onClick={() => onClickNext()} />
      </Slide>
    </>
  );
}

const Container = styled.div``;

const Input = styled.input`
  margin-top: var(--gap-4);
  padding: var(--gap-2);
  width: 100%;
  border: var(--border);
  border-radius: var(--rounded);
  :focus {
    outline-color: var(--gray-1);
  }
`;

export default GroupWritingHashTag;
