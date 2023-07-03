import { ChangeEvent } from "react";
import styled from "styled-components";
import { TIME_SELECTOR_MINUTES } from "../../constants/study";

interface ITimeSelectorDual {
  time: { hour?: number; minutes?: number };
  setTime: ({ hour, minutes }) => void;
  timeArr: number[];
}

function TimeSelectorDual({ time, setTime, timeArr }: ITimeSelectorDual) {
  const changeHour = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.currentTarget.value);
    setTime({ hour: value, minutes: time.minutes });
  };

  const changeMinute = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.currentTarget.value);
    setTime({ hour: time.hour, minutes: value });
  };
  return (
    <Layout>
      <SelectHour
        name="hour"
        value={time.hour}
        placeholder="시간"
        onChange={changeHour}
      >
        {timeArr.map((h) => (
          <Option key={h} value={h}>
            {h}
          </Option>
        ))}
      </SelectHour>
      :
      <SelectMinute
        name="minute"
        defaultValue={String(time.minutes).padStart(2, "0")}
        placeholder="분"
        onChange={changeMinute}
      >
        {TIME_SELECTOR_MINUTES.map((m) => (
          <Option key={m} value={m}>
            {m}
          </Option>
        ))}
      </SelectMinute>
    </Layout>
  );
}

const SelectHour = styled.select`
  font-weight: 600;
  color: var(--font-h1);
`;

const SelectMinute = styled.select`
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
