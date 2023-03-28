import { Box, Text } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { ChangeEvent, FC } from "react";

import { ITimeStartToEndHM } from "../../types/utils";
import { useState } from "react";
import styled from "styled-components";

const StartHOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const ENDHOURS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const MINUTES = ["00", "30"];

const TimeSelector = ({ times, setTimes }: ITimeSelector) => {
  return (
    <Layout>
      <TimeSelectorUnit type="start" time={times.start} setTimes={setTimes} />
      <TimeSelectorUnit type="end" time={times.end} setTimes={setTimes} />
    </Layout>
  );
};

interface ITimeSelector {
  times: ITimeStartToEndHM;
  setTimes: ({ start, end }: ITimeStartToEndHM) => void;
}

const TimeSelectorUnit = ({ type, time, setTimes }: ITimeSelectorUnit) => {
  const hoursArr = type === "start" ? StartHOURS : ENDHOURS;
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
        {MINUTES.map((m) => (
          <Option key={m} value={m}>
            {m}
          </Option>
        ))}
      </Select>
    </UnitLayout>
  );
};

const Layout = styled.div``;
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

const Select = styled.select``;

const Name = styled.span`
  font-size: 15px;
  color: var(--font-h1);
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