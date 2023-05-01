import styled from "styled-components";
import { ChangeEvent } from "react";

import {
  TIME_SELECTOR_END,
  TIME_SELECTOR_MINUTES,
  TIME_SELECTOR_START,
} from "../../constants/study";
import { ITimeSelector, ITimeStartToEndHM } from "../../types/utils";

const TimeSelector = ({ times, setTimes }: ITimeSelector) => {
  return (
    <Layout>
      <TimeSelectorUnit type="start" time={times.start} setTimes={setTimes} />
      <TimeSelectorUnit type="end" time={times.end} setTimes={setTimes} />
    </Layout>
  );
};

function TimeSelectorUnit({ type, time, setTimes }: ITimeSelectorUnit) {
  const hoursArr = type === "start" ? TIME_SELECTOR_START : TIME_SELECTOR_END;
  const onChangeTime =
    (isHour: boolean) => (event: ChangeEvent<HTMLSelectElement>) => {
      const value = Number(event.currentTarget.value);
      let hour = time.hour;
      let minutes = time.minutes;

      if (type === "start") {
        if (isHour) hour = value;
        else minutes = value;

        setTimes({ start: { hour, minutes }, end: null });
      } else {
        if (isHour) hour = value;
        else minutes = value;

        setTimes({ start: null, end: { hour, minutes } });
      }
    };
  return (
    <UnitLayout key={type}>
      <Name>{type === "start" ? "시작 시간" : "종료 시간"}</Name>
      <Select
        name={type + "h"}
        defaultValue={time.hour}
        placeholder="시간"
        onChange={onChangeTime(true)}
      >
        {hoursArr.map((h) => (
          <Option key={h} value={h}>
            {h}
          </Option>
        ))}
      </Select>
      :
      <Select
        name={type + "m"}
        defaultValue={String(time.minutes).padStart(2, "0")}
        placeholder="분"
        onChange={onChangeTime(false)}
      >
        {TIME_SELECTOR_MINUTES.map((m) => (
          <Option key={m} value={m}>
            {m}
          </Option>
        ))}
      </Select>
    </UnitLayout>
  );
}

const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UnitLayout = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;

  > select {
    width: 56px;
    height: 28px;
    border: 1px solid var(--font-h1);
    border-radius: 4px;
    padding-left: 6px;
    margin-right: 6px;
    margin-left: 6px;
  }
`;

const Select = styled.select`
  font-weight: 600;
  color: var(--font-h1);
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--font-h2);
  display: inline-block;
  margin-right: 12px;
`;

const Option = styled.option``;

interface ITimeSelectorUnit {
  time: {
    hour?: number;
    minutes?: number;
  };
  type: string;
  setTimes: ({ start, end }: ITimeStartToEndHM) => void;
}

export default TimeSelector;
