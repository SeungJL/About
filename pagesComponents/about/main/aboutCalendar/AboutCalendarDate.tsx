import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../../recoil/studyAtoms";

interface IAboutCalendarDate {
  isCalendarWeek: boolean;
}

interface ICalendarBox {
  date: number;
}

function AboutCalendarDate({ isCalendarWeek }: IAboutCalendarDate) {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [calendarBox, setCalendarBox] = useState<ICalendarBox[]>([]);

  const lastMonthDays = voteDate.subtract(1, "month").daysInMonth();
  let monthMove: "left" | "right" = null;

  useEffect(() => {
    const daysInMonth = voteDate.daysInMonth();
    const startDayInMonth = voteDate.date(1).day();
    const rowsInMonth = startDayInMonth + daysInMonth <= 35 ? 5 : 6;

    const date = voteDate.date();
    console.log(5, daysInMonth);
    const temp = [];
    if (isCalendarWeek) {
      for (let i = date; i < date + 7; i++) {
        const validDate =
          i >= daysInMonth + 4
            ? -daysInMonth + i - 3
            : i > 3
            ? i - 3
            : lastMonthDays - 3 + i;
        temp.push({ date: validDate });
      }
    } else {
      for (let i = 1; i <= 7 * rowsInMonth; i++) {
        if (i <= startDayInMonth) temp.push(null);
        else if (i > daysInMonth + startDayInMonth) temp.push(null);
        else temp.push({ date: i - startDayInMonth });
      }
    }
    setCalendarBox(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalendarWeek, voteDate]);

  const onClickDate = (d: ICalendarBox) => {
    const date = voteDate.date();
    if (date < 10 && d.date > 20) {
      setVoteDate(voteDate.subtract(1, "month").date(d.date));
    } else if (date > 20 && d.date < 10) {
      setVoteDate(voteDate.add(1, "month").date(d.date));
    } else setVoteDate(voteDate.date(d.date));
  };

  const IconCircle = ({ children }) => <CircleLayout>{children}</CircleLayout>;

  const center = { x: 0, y: 0 };

  const pickDate = voteDate.date();
  console.log(pickDate);

  return (
    <>
      <Layout isSmall={isCalendarWeek}>
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
          <Pick>PICK</Pick>
        </AnimatePresence>
      </Layout>
    </>
  );
}

const Layout = styled.div<{ isSmall: boolean }>`
  position: relative;
  color: var(--font-h3);
  font-size: 15px;
  font-weight: 600;
  display: ${(props) => (props.isSmall ? "flex" : "grid")};
  justify-content: ${(props) => props.isSmall && "spaceBetween"};
  grid-template-columns: ${(props) => !props.isSmall && "repeat(7,1fr)"};
`;

const DayItem = styled(motion.div)<{ iscenter: "true" | "false" }>`
  padding: var(--padding-sub) var(--padding-min);
  margin: ${(props) => props.iscenter === "true" && "0 23px"};
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
`;

export default AboutCalendarDate;
