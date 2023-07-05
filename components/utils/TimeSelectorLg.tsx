import { useToast } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import { STUDY_TIME_TABLE } from "../../constants/study";
import { ITimeSelector } from "../../types/utils";

function TimeSelectorLg({ times, setTimes }: ITimeSelector) {
  const toast = useToast();
  const [isStart, setIsStart] = useState(true);

  const timeArr: Dayjs[] = [];
  const startTime =
    times.start &&
    dayjs()
      .hour(times?.start?.hours)
      .minute(times?.start?.minutes)
      .format("HH:mm");

  const endTime =
    times.end &&
    dayjs().hour(times?.end?.hours).minute(times?.end?.minutes).format("HH:mm");
  STUDY_TIME_TABLE.forEach((time) => {
    const timeHour = dayjs().hour(time);
    timeArr.push(timeHour.minute(0), timeHour.minute(30));
  });

  timeArr.push(dayjs().hour(23).minute(0));

  const onClick = (time: Dayjs) => {
    if (isStart) {
      setTimes({
        start: { hours: time.hour(), minutes: time.minute() },
        end: null,
      });
      setIsStart(false);
    } else {
      if (time.format("HH:mm") < startTime) {
        toast({
          title: "선택 불가능",
          description: "종료 시간은 시작 시간 이후여야 합니다",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      if (time.format("HH:mm") === startTime) {
        setTimes({
          start: null,
          end: null,
        });
        setIsStart(true);
        return;
      }
      if (time.format("HH:mm") === endTime) {
        setTimes({
          start: times.start,
          end: null,
        });

        return;
      }
      setTimes({
        start: times.start,
        end: { hours: time.hour(), minutes: time.minute() },
      });
    }
  };

  return (
    <Layout>
      {timeArr.map((time, idx) => (
        <Item key={idx} onClick={() => onClick(time)}>
          {[startTime, endTime].includes(time.format("HH:mm")) ? (
            <SelectCircle
              key={idx}
              isStart={time.format("HH:mm") === startTime}
            >
              {time.format("HH:mm A")}
            </SelectCircle>
          ) : (
            time.format("HH:mm A")
          )}
        </Item>
      ))}
    </Layout>
  );
}
const Layout = styled.div`
  height: 210px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 2px solid var(--font-h5);
  border-radius: var(--border-radius-sub);
  padding: 4px 0;
  overflow-y: auto;
`;

const Item = styled.div`
  font-size: 14px;
  color: var(--font-h1);
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectCircle = styled.div<{ isStart: boolean }>`
  width: 95%;
  height: 32px;
  background-color: ${(props) =>
    props.isStart ? "var(--color-mint)" : "var(--color-red)"};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

export default TimeSelectorLg;
