import { Box, Select, Text } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { ChangeEvent, FC } from "react";

import { IParticipation } from "../../../../models/vote";

import { ITimeStartToEnd } from "../../../../types/utils";
import { useState } from "react";

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const MINUTES = ["00", "30"];

const TimeSelector = ({ times, setTimes }: ITimeSelector) => {
  // setTime({ start, end });

  return (
    <>
      <TimeSelectorUnit type="start" time={times.start} setTimes={setTimes} />
      <TimeSelectorUnit type="end" time={times.end} setTimes={setTimes} />
    </>
  );
};

interface ITimeSelector {
  times: ITimeStartToEnd;
  setTimes: ({ start, end }: ITimeStartToEnd) => void;
}

const TimeSelectorUnit = ({ type, time, setTimes }: ITimeSelectorUnit) => {
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
    <Box key={type}>
      <Box display="inline-block" width="40px">
        <Text>{type === "start" ? "시작" : "끝"}</Text>
      </Box>
      <Select
        name={type + "h"}
        defaultValue={time.hour}
        placeholder="시간"
        width="fit-content"
        display="inline-block"
        onChange={onChangeTime(true)}
      >
        {HOURS.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </Select>
      :
      <Select
        name={type + "m"}
        defaultValue={String(time.minutes).padStart(2, "0")}
        placeholder="분"
        width="fit-content"
        display="inline-block"
        onChange={onChangeTime(false)}
      >
        {MINUTES.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>
    </Box>
  );
};

interface ITimeSelectorUnit {
  time: {
    hour?: number;
    minutes?: number;
  };
  type: string;
  setTimes: ({ start, end }: ITimeStartToEnd) => void;
}

export default TimeSelector;
