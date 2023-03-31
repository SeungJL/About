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
    for (let i = 1; i <= dayjs().month(voteDate.month()).daysInMonth(); i++) {
      temp.push({
        start: voteDate.date(i - 1),
        end: voteDate.date(i),
      });
    }
    setmonthRange(temp);
  }, [voteDate]);

  const myMonthAttendQueries = useAttendRateQueries(monthRange);
  let isLoading = true;

  const myMonthAttend = myMonthAttendQueries?.map((item, idx) => {
    if (!item.isLoading) {
      const myData = (item.data as IRate[]).filter(
        (data) => data.name === session?.user.name
      )[0];

      if (idx === myMonthAttendQueries.length - 1) isLoading = false;
      return myData?.cnt !== 0 && true;
    }
  });

  useEffect(() => {
    const daysInMonth = voteDate.month(month).daysInMonth();
    const startDayInMonth = voteDate.month(month).date(1).day();
    const rowsInMonth = startDayInMonth + daysInMonth < 35 ? 5 : 6;
    const date = voteDate.date();
    const dayInWeek = voteDate.day();

    const temp = [];
    let isAttend = false;

    console.log(222, calendarType, startDayInMonth);
    if (calendarType === "week") {
      const start = date - dayInWeek;
      for (let i = start; i < start + 7; i++) {
        const validDate = i >= 1 && i <= daysInMonth ? i : null;
        isAttend = validDate && myMonthAttend[i] ? true : false;

        temp.push({ date: validDate, isAttend });
      }
    }
    if (calendarType === "month") {
      for (let i = 1; i <= 7 * rowsInMonth; i++) {
        if (i <= startDayInMonth) temp.push(null);
        else if (i > daysInMonth + startDayInMonth) temp.push(null);
        else {
          isAttend = myMonthAttend[i - startDayInMonth - 1] ? true : false;
          temp.push({ date: i - startDayInMonth, isAttend });
        }
      }
    }
    setCalendarBox(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarType, isLoading, voteDate]);

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
    <Layout layout transition={{ duration: 0.3 }}>
      <Header>
        <Date>
          <span>{voteDate.format("YYYY년 M월")}</span>
          {calendarType === "week" ? (
            <FontAwesomeIcon
              icon={faChevronDown}
              size="sm"
              onClick={() => setCalendarType("month")}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronUp}
              size="sm"
              onClick={() => setCalendarType("week")}
            />
          )}
        </Date>
        {calendarType === "month" && (
          <>
            <IconToolTip>
              <AttendCircle />
              <span>내 스터디 참여</span>
            </IconToolTip>
            <MonthNav>
              <FontAwesomeIcon icon={faChevronLeft} onClick={onClickPrev} />
              <FontAwesomeIcon icon={faChevronRight} onClick={onClickNext} />
            </MonthNav>
          </>
        )}
      </Header>
      <DayOfWeek />
      <CallenderDays isFlex={calendarType === "week"}>
        {calendarBox.map((d, idx) => (
          <DayItem
            layout
            transition={{ duration: 0.3 }}
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
  border-bottom: 1px solid #e3e6eb;
`;

const Header = styled.header`
  height: 46px;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px 8px 16px;
  align-items: center;
`;
const Date = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-weight: 600;
    color: var(--font-h1);
    font-size: 20px;

    align-items: center;
    margin-right: 12px;
  }
`;
const CallenderDays = styled.div<{ isFlex: boolean }>`
  display: flex;
  color: #767d8a;
  margin: 0px 4px;
  margin: 4px;
  font-weight: 500;
  font-size: 15px;
  padding: 0;
  display: ${(props) => (props.isFlex ? "flex" : "grid")};
  justify-content: ${(props) => (props.isFlex ? "spaceBetween" : null)};
  grid-template-columns: ${(props) => (props.isFlex ? null : "repeat(7,1fr)")};
  grid-auto-rows: ${(props) => (props.isFlex ? null : "40px")};
`;

const DayItem = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 48px;

  > div {
    margin: 4px auto 0px auto;
  }
`;

const IconToolTip = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-left: 6px;
    font-size: 10px;
    color: var(--font-h3);
  }
`;

const MonthNav = styled.nav`
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
  margin: 0 22px;
  display: flex;
  justify-content: space-between;
  color: #a0a4af;
  font-size: 13px;
  padding: 0 2px;
  margin-bottom: 7px;
`;

export default Calendar;
