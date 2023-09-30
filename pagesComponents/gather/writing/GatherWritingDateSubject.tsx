import { useEffect, useState } from "react";
import styled from "styled-components";
import TimeSelectorUnit from "../../../components/features/atoms/TimeSelectorUnit";
import { TIME_SELECTOR_UNIT } from "../../../constants/settingValue/util";
import { GatherListItem, IGatherWriting } from "../../../types/page/gather";
import { DispatchType } from "../../../types/reactTypes";
import { ITime } from "../../../types/timeAndDate";

interface IGatherWritingDateSubject {
  gatherWriting: IGatherWriting;
  setGatherList: DispatchType<GatherListItem[]>;
}
interface IGatherSubject {
  text: string;
  time: ITime;
}

function GatherWritingDateSubject({
  gatherWriting,
  setGatherList,
}: IGatherWritingDateSubject) {
  const [firstGather, setFirstGather] = useState<IGatherSubject>({
    text: gatherWriting?.gatherList?.[0]?.text || "",
    time: { hours: 14, minutes: 0 },
  });
  const [secondGather, setSecondGather] = useState<IGatherSubject>({
    text: gatherWriting?.gatherList?.[1]?.text || "",
    time: { hours: 18, minutes: 0 },
  });

  useEffect(() => {
    const gatherList = [{ text: firstGather.text, time: firstGather.time }];
    if (secondGather?.text?.length)
      gatherList.push({ text: secondGather.text, time: secondGather.time });
    setGatherList(gatherList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    firstGather.text,
    firstGather.time,
    secondGather.text,
    secondGather.time,
  ]);

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "first" | "second"
  ) => {
    const value = e.target.value;
    if (type === "first") setFirstGather((old) => ({ ...old, text: value }));
    if (type === "second") setSecondGather((old) => ({ ...old, text: value }));
  };

  return (
    <Layout>
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
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 60px;
`;

const Message = styled.div`
  margin-top: var(--margin-max);
  font-size: 13px;
  color: var(--font-h4);
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
export default GatherWritingDateSubject;
