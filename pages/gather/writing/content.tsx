import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TimeSelectorUnit from "../../../components/features/atoms/TimeSelectorUnit";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/layout/ProgressStatus";
import { TIME_SELECTOR_UNIT } from "../../../constants/util";
import { useFailToast } from "../../../hooks/CustomToast";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { sharedGatherDataState } from "../../../recoil/sharedDataAtoms";

import { ITime } from "../../../types/timeAndDate";

interface IGather {
  text: string;
  time: ITime;
}

function WritingContent() {
  const router = useRouter();
  const toast = useToast();
  const failToast = useFailToast();
  const [gatherContent, setGatherContent] = useRecoilState(
    sharedGatherDataState
  );
  const [title, setTitle] = useState(gatherContent?.title || "");
  const [content, setContent] = useState(gatherContent?.content || "");

  const [firstGather, setFirstGather] = useState<IGather>({
    text: gatherContent?.gatherList?.[0]?.text || "",
    time: { hours: 14, minutes: 0 },
  });
  const [secondGather, setSecondGather] = useState<IGather>({
    text: gatherContent?.gatherList?.[1]?.text || "",
    time: { hours: 18, minutes: 0 },
  });

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "first" | "second"
  ) => {
    const value = e.target.value;
    if (type === "first") setFirstGather((old) => ({ ...old, text: value }));
    if (type === "second") setSecondGather((old) => ({ ...old, text: value }));
  };

  const onClickNext = () => {
    if (!firstGather?.text) {
      failToast("free", "1차 모임 작성은 필수입니다!", true);
      return;
    }
    if (!title || !content) {
      failToast("free", "내용을 작성해 주세요!", true);
      return;
    }

    const gatherList = [{ text: firstGather.text, time: firstGather.time }];
    if (secondGather?.text?.length)
      gatherList.push({ text: secondGather.text, time: secondGather.time });

    setGatherContent((old) => ({
      ...old,
      title,
      content,
      gatherList,
    }));
    router.push(`/gather/writing/date`);
  };

  return (
    <PageLayout>
      <ProgressStatus value={50} />
      <Header title="" url="/gather/writing/category" />
      <RegisterLayout>
        <RegisterOverview>
          <span>내용을 입력해 주세요.</span>
        </RegisterOverview>
        <Container>
          <TitleInput
            placeholder="제목"
            value={title}
            onChange={onChangeTitle}
          />
          <Content
            placeholder="소개글을 입력해 주세요"
            value={content}
            onChange={onChangeContent}
          />
        </Container>
        <TimeContent>
          <span>1차 모임</span>
          <TimeContentInput
            placeholder="ex) 보드게임"
            value={firstGather?.text}
            onChange={(e) => onChangeInput(e, "first")}
          />
          <TimeSelectorUnit
            time={firstGather?.time}
            setTime={(time) => setFirstGather((old) => ({ ...old, time }))}
            timeArr={TIME_SELECTOR_UNIT}
          />
        </TimeContent>
        <TimeContent>
          <span>2차 모임</span>
          <TimeContentInput
            placeholder="ex) 뒤풀이"
            value={secondGather?.text}
            onChange={(e) => onChangeInput(e, "second")}
          />
          <TimeSelectorUnit
            time={secondGather?.time}
            setTime={(time) => setSecondGather((old) => ({ ...old, time }))}
            timeArr={TIME_SELECTOR_UNIT}
            disabled={secondGather?.text === ""}
          />
        </TimeContent>
        <Message>2차 모임은 있는 경우에만 작성해 주시면 돼요!</Message>
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

const TimeContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--margin-main);
  > span:first-child {
    color: var(--font-h2);
    font-size: 14px;
    font-weight: 600;
    margin-right: var(--margin-sub);
  }
`;

const TimeContentInput = styled.input`
  flex: 1;
  border: var(--border-main);
  border-radius: var(--border-radius-sub);
  height: 36px;
  padding: var(--padding-md);
  font-size: 12px;
  :focus {
    outline: none;
    border: var(--border-focus);
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

const Message = styled.div`
  margin-top: var(--margin-max);
  font-size: 13px;
  color: var(--font-h4);
`;

export default WritingContent;
