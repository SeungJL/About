import { ChangeEvent } from "react";
import styled from "styled-components";
import { ITime } from "../../types/utils";

interface ITimeSelectorUnit {
  time: ITime;
  setTime: (time: { hour: number; minute: number }) => void;
  timeArr: string[];
  disabled?: boolean;
}

function TimeSelectorUnit({
  time,
  setTime,
  timeArr,
  disabled,
}: ITimeSelectorUnit) {
  const hourStr = String(time.hour);
  const minuteStr = time.minute
    ? String(time.minute)
    : String(time.minute) + "0";

  const onChangeTime = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    const hour = Number(value.slice(0, 2));
    const minute = Number(value.slice(3));
    setTime({ hour, minute });
  };

  return (
    <Layout>
      <Select
        name="hour"
        value={`${hourStr}:${minuteStr}`}
        placeholder="시간"
        onChange={onChangeTime}
        disabled={disabled}
      >
        {timeArr.map((timeValue) => (
          <Option key={timeValue} value={timeValue}>
            {timeValue}
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
    color: var(--font-h2);
    width: 68px;
    height: 36px;
    padding-left: 6px;
    margin-right: 6px;
    margin-left: 6px;
    border: 1.5px solid var(--font-h5);
    border-radius: var(--border-radius);
    font-size: 12px;

    :focus {
      outline: none;
      border: 1 5px solid var(--font-h2);
    }
  }
`;

const Option = styled.option``;

export default TimeSelectorUnit;
