import { ChangeEvent } from "react";
import styled from "styled-components";
import { TIME_SELECTOR_MINUTES } from "../../constants/study";
import { ITime } from "../../types/utils";

interface ITimeSelectorDual {
  time: ITime;
  setTime: ({ hour, minutes }) => void;
  timeArr: number[];
}

function TimeSelectorDual({ time, setTime, timeArr }: ITimeSelectorDual) {
  const onChangeTime =
    (isHour: boolean) => (event: ChangeEvent<HTMLSelectElement>) => {
      const value = Number(event.currentTarget.value);
      let hour = time.hour;
      let minutes = time.minute;
      if (isHour) setTime({ hour: value, minutes });
      else setTime({ hour, minutes: value });
    };
  return (
    <Layout>
      <Select
        name="hour"
        value={time.hour}
        placeholder="시간"
        onChange={onChangeTime(true)}
      >
        {timeArr.map((h) => (
          <Option key={h} value={h}>
            {h}
          </Option>
        ))}
      </Select>
      :
      <Select
        name="minute"
        defaultValue={String(time.minute).padStart(2, "0")}
        placeholder="분"
        onChange={onChangeTime(false)}
      >
        {TIME_SELECTOR_MINUTES.map((m) => (
          <Option key={m} value={m}>
            {m}
          </Option>
        ))}
      </Select>
    </Layout>
  );
}
const Select = styled.select`
  font-weight: 600;
  color: var(--font-h1);
`;
const Layout = styled.div`
  display: flex;

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
const Option = styled.option``;

export default TimeSelectorDual;
