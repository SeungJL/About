import { background, position } from "@chakra-ui/react";
import dayjs from "dayjs";
import { relative } from "path";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { useRecoilState } from "recoil";

import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import ca from "@mobiscroll/react/dist/src/i18n/ca";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { voteDateState } from "../../../recoil/studyAtoms";
import { IDateStartToEnd } from "../../../types/utils";
import { IconCircle } from "../../../public/icons/IconOutline";
import { IRate, useAttendRateQueries } from "../../../hooks/user/queries";

function Calendar() {
  const { data: session } = useSession();
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  const [calendarType, setCalendarType] = useState<"week" | "month">("week");
  const [calendarBox, setCalendarBox] = useState<
    {
      date: number;
      isAttend: boolean;
    }[]
  >([]);
  const [month, setMonth] = useState(dayjs().month());

  const [monthRange, setmonthRange] = useState<IDateStartToEnd[]>([]);
  useEffect(() => {
    const temp = [];
    for (let i = 1; i <= voteDate.daysInMonth(); i++) {
      temp.push({
        start: voteDate.date(i - 1),
        end: voteDate.date(i),
      });
    }
    setmonthRange(temp);
  }, [voteDate]);

  // const myMonthAttendQueries = useAttendRateQueries(monthRange);
  // let isLoading = true;

  // const myMonthAttend = myMonthAttendQueries?.map((item, idx) => {
  //   if (!item.isLoading) {
  //     const myData = (item.data as IRate[]).filter(
  //       (data) => data.name === session?.user.name
  //     )[0];

  //     if (idx === myMonthAttendQueries.length - 1) isLoading = false;
  //     return myData?.cnt !== 0 && true;
  //   }
  // });

  useEffect(() => {
    const daysInMonth = voteDate.daysInMonth();
    const startDayInMonth = voteDate.date(1).day();
    const rowsInMonth = startDayInMonth + daysInMonth < 35 ? 5 : 6;
    const date = voteDate.date();
    const dayInWeek = voteDate.day();

    const temp = [];
    let isAttend = false;

    if (calendarType === "week") {
      const start = date - dayInWeek;
      for (let i = start; i < start + 7; i++) {
        const validDate = i >= 1 && i <= daysInMonth ? i : null;
        // isAttend = validDate && myMonthAttend[i] ? true : false;

        temp.push({ date: validDate });

        // temp.push({ date: validDate, isAttend });
      }
    }
    if (calendarType === "month") {
      for (let i = 1; i <= 7 * rowsInMonth; i++) {
        if (i <= startDayInMonth) temp.push(null);
        else if (i > daysInMonth + startDayInMonth) temp.push(null);
        else {
          // isAttend = myMonthAttend[i - startDayInMonth - 1] ? true : false;
          temp.push({ date: i - startDayInMonth });
          // temp.push({ date: i - startDayInMonth, isAttend });
        }
      }
    }
    setCalendarBox(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarType, voteDate]);
  //isLoading

  const onClickDate = (d) => {
    setVoteDate(voteDate.date(d.date));
  };

  const onClickPrev = () => {
    setVoteDate((old) => old.subtract(1, "month").date(1));
    setMonth(month - 1);
  };

  const onClickNext = () => {
    setVoteDate((old) => old.add(1, "month").date(1));
    setMonth(month + 1);
  };

  return (
    <Layout>
      <Header>
        <Date>
          <span>{voteDate.format("YYYY년 M월")}</span>
          {calendarType === "week" ? (
            <FontAwesomeIcon
              icon={faChevronDown}
              size="xs"
              onClick={() => setCalendarType("month")}
              color="var(--color-mint)"
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronUp}
              size="xs"
              onClick={() => setCalendarType("week")}
              color="var(--color-mint)"
            />
          )}
        </Date>
        {calendarType === "month" && (
          <>
            {/* <IconToolTip>
              <AttendCircle />
              <span>내 스터디 참여</span>
            </IconToolTip> */}
            <MonthNav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={onClickPrev}
                size="sm"
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={onClickNext}
                size="sm"
              />
            </MonthNav>
          </>
        )}
      </Header>
      <div style={{ borderTop: "1px solid var(--font-h6)" }} />
      <DayOfWeek />
      <CallenderDays
        col={calendarType === "week" ? "true" : "false"}
        initial={{ opacity: 0 }}
        animate={{ height: calendarType === "week" ? 40 : 235, opacity: 1 }}
        transition={{ duration: 0.3, opacity: { delay: 0.3 } }}
      >
        {calendarBox.map((d, idx) => (
          <DayItem
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            key={idx}
            onClick={() => onClickDate(d)}
          >
            {d?.date === voteDate?.date() ? (
              <IconCircle>{d?.date}</IconCircle>
            ) : (
              <div>{d?.date}</div>
            )}

            {d?.isAttend && <AttendCircle />}
          </DayItem>
        ))}
      </CallenderDays>
    </Layout>
  );
}

const DayOfWeek = () => (
  <DayLine>
    <span>일</span>
    <span>월</span>
    <span>화</span>
    <span>수</span>
    <span>목</span>
    <span>금</span>
    <span>토</span>
  </DayLine>
);

const Layout = styled(motion.div)`
  margin-top: 0px;
  border-bottom: 1px solid #e3e6eb;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0px 14px 8px 14px;
  align-items: center;
`;
const Date = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  > span {
    color: var(--color-mint);
    font-size: 13px;
    align-items: center;
    margin-right: 8px;
  }
`;
const CallenderDays = styled(motion.div)<{ col: string }>`
  display: flex;
  color: var(--font-h2);
  margin: 0px 4px 0px 4px;
  font-size: 14px;

  height: 36px;
  padding: 0;
  display: ${(props) => (props.col === "true" ? "flex" : "grid")};
  justify-content: ${(props) => (props.col === "true" ? "spaceBetween" : null)};
  grid-template-columns: ${(props) =>
    props.col === "true" ? null : "repeat(7,1fr)"};
  grid-auto-rows: ${(props) => (props.col = "true" ? null : "36px")};
`;

const DayItem = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 32px;
  align-items: center;

  > div {
    margin: 4px auto 0px auto;
  }
`;

const MonthNav = styled(motion.nav)`
  width: 40px;
  display: flex;
  justify-content: space-between;
  margin-right: 8px;
  color: var(--font-h2);
`;

const AttendCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-mint);
`;

const DayLine = styled.div`
  margin: 8px 22px;

  display: flex;
  justify-content: space-between;
  color: #a0a4af;
  font-size: 12px;
  padding: 0 2px;
  margin-bottom: 7px;
`;

export default Calendar;
