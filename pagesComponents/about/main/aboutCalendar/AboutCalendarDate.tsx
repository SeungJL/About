import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../../recoil/studyAtoms";

interface ICalendarBox {
  date: number;
}

function AboutCalendarDate() {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [calendarBox, setCalendarBox] = useState<ICalendarBox[]>([]);

  const lastMonthDays = voteDate.subtract(1, "month").daysInMonth();

  useEffect(() => {
    const daysInMonth = voteDate.daysInMonth();
    const date = voteDate.date();
    const temp = [];
    for (let i = date; i < date + 7; i++) {
      const validDate =
        i >= daysInMonth + 4
          ? -daysInMonth + i - 3
          : i > 3
          ? i - 3
          : lastMonthDays - 3 + i;
      temp.push({ date: validDate });
    }

    setCalendarBox(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  const onClickDate = (d: ICalendarBox) => {
    const date = voteDate.date();
    if (date < 10 && d.date > 20) {
      setVoteDate(voteDate.subtract(1, "month").date(d.date));
    } else if (date > 20 && d.date < 10) {
      setVoteDate(voteDate.add(1, "month").date(d.date));
    } else setVoteDate(voteDate.date(d.date));
  };

  const IconCircle = ({ children }) => <CircleLayout>{children}</CircleLayout>;

  return (
    <>
      <Layout>
        <AnimatePresence>
          {calendarBox.map((d, idx) => {
            return (
              <DayItem
                layout
                key={d.date}
                initial={{
                  opacity: 1,
                  x: idx === 6 ? 40 : idx === 0 ? -40 : undefined,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: idx === 3 && -46,
                }}
                transition={{ duration: 1 }}
                iscenter={idx === 3 ? "true" : "false"}
                onClick={() => onClickDate(d)}
              >
                {d?.date === voteDate.date() ? (
                  <IconCircle>
                    <PickDate>{d?.date}</PickDate>
                  </IconCircle>
                ) : (
                  <div>{d?.date}</div>
                )}
              </DayItem>
            );
          })}
          <Pick>Today</Pick>
        </AnimatePresence>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  position: relative;
  color: var(--font-h3);
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  margin: 0 2px;
`;

const DayItem = styled(motion.div)<{ iscenter: "true" | "false" }>`
  padding: var(--padding-sub) var(--padding-min);
  margin: ${(props) => props.iscenter === "true" && "0 24.3px"};
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  position: relative;
`;

const CircleLayout = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  color: var(--color-mint);
  font-weight: 600;
  z-index: 1000;
  align-items: center;
  > span:first-child {
    margin-bottom: 2px;
  }
`;

const PickDate = styled.div`
  border: 1.5px solid var(--color-mint);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pick = styled.div`
  position: absolute;
  left: 50%;
  top: -48px;
  transform: translate(-50%, -50%);
  color: var(--color-mint);
  font-weight: 400;
  font-size: 13px;
`;

export default AboutCalendarDate;
