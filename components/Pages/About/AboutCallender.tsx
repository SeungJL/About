import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IconArrowBottom, IconArrowTop } from "../../../public/icons/Icons";
import { useRecoilState } from "recoil";
import { voteDateState } from "../../../recoil/atoms";
import {
  Datepicker,
  CalendarPrev,
  CalendarNext,
  localeKo,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { IRate, useAttendRateQueries } from "../../../hooks/user/queries";
import { useSession } from "next-auth/react";
import { IDateStartToEnd } from "../../../types/utils";

function Calendar() {
  const { data: session } = useSession();
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  const [calendarType, setCalendarType] = useState<"week" | "month">("week");
  const [monthRange, setmonthRange] = useState<IDateStartToEnd[]>([]);
  const [markedArr, setMarkedArr] = useState([]);

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
  const isLoading = myMonthAttendQueries.some((result) => result.isLoading);
  const myMonthAttend = myMonthAttendQueries?.map((item) => {
    if (item.isSuccess) {
      const myDataArr = (item.data as IRate[]).filter(
        (data) => data.name === session?.user.name
      );
      return myDataArr[0]?.cnt !== 0 && true;
    }
  });

  useEffect(() => {
    if (!isLoading) {
      const temp = [];
      for (let i = 0; i < myMonthAttend.length; i++) {
        if (myMonthAttend[i]) {
          temp.push({
            date: new Date(voteDate.year(), voteDate.month(), i),
            color: "var(--color-mint)",
          });
        }
      }
      setMarkedArr(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, voteDate]);

  const CalendarHeader = () => (
    <Header>
      <DateBasic>
        <span>{voteDate.format("YYYY년 M월")}</span>
        {calendarType === "week" ? (
          <ArrowIconWrapper onClick={() => setCalendarType("month")}>
            <IconArrowBottom />
          </ArrowIconWrapper>
        ) : (
          <>
            <ArrowIconWrapper onClick={() => setCalendarType("week")}>
              <IconArrowTop />
            </ArrowIconWrapper>{" "}
            <Tooltip>
              <CircleIcon />
              <span>스터디 참여</span>
            </Tooltip>
            <Nav>
              <CalendarPrev />
              <CalendarNext />
            </Nav>
          </>
        )}
      </DateBasic>
    </Header>
  );

  const onChange = (e) => {
    setVoteDate(dayjs(e.value));
  };
  return (
    <Layout layout>
      <StyledDatePicker
        display="inline"
        controls={["calendar"]}
        calendarType={calendarType}
        value={voteDate.toDate()}
        calendarSize={1}
        renderCalendarHeader={CalendarHeader}
        locale={localeKo}
        onChange={onChange}
        marked={markedArr}
      />
    </Layout>
  );
}
const DateBasic = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > span {
    font-weight: 600;
    color: var(--font-h1);
    font-size: 20px;
    letter-spacing: -4%;
    align-items: center;
    margin-right: 8px;
  }
`;
const Nav = styled.nav`
  margin-left: auto;
`;
const StyledDatePicker = styled(Datepicker)`
  .mbsc-ios.mbsc-selected .mbsc-calendar-cell-text {
    background-color: var(--color-mint);
    border-color: var(--color-mint);
  }
  .mbsc-ios.mbsc-calendar-button.mbsc-button {
    color: var(--font-h2);
  }
`;

const Layout = styled(motion.div)`
  padding-bottom: 8px;
  min-height: 120px;
`;

const Header = styled.header`
  height: 46px;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px 8px 16px;
  width: 100%;
`;
const Tooltip = styled.div`
  margin-left: 40px;
  display: flex;
  align-items: center;
  margin-top: 3px;
  > span {
    margin-left: 6px;
    color: var(--font-h3);
    font-weight: 600;
    font-size: 10px;
  }
`;
const CircleIcon = styled.div`
  background-color: var(--color-mint);
  border-radius: 50%;
  width: 6px;
  height: 6px;
`;

const ArrowIconWrapper = styled.div`
  padding-bottom: 4px;
  margin-left: 4px;
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
