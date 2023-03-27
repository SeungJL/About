import { background, position } from "@chakra-ui/react";
import dayjs from "dayjs";
import { relative } from "path";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { mySpaceFixedState, voteDateState } from "../../recoil/atoms";
import { IconArrowBottom, IconArrowTop } from "../../public/icons/Icons";
import { IconCircle } from "../../public/icons/IconOutline";
import { IRate, useAttendRateQueries } from "../../hooks/user/queries";
import { IDateStartToEnd } from "../../types/utils";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

function AboutCallender() {
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
  const isLoading = myMonthAttendQueries.some((result) => result.isLoading);

  const myMonthAttend = myMonthAttendQueries?.map((item) => {
    if (item.isSuccess) {
      const myData = (item.data as IRate[]).filter(
        (data) => data.name === session?.user.name
      )[0];
      return myData?.cnt !== 0 && true;
    }
  });

  useEffect(() => {
    const daysInMonth = dayjs().month(month).daysInMonth();
    const startDayInMonth = dayjs().month(month).date(1).day();
    const rowsInMonth = startDayInMonth + daysInMonth < 35 ? 5 : 6;
    const date = voteDate.date();
    const dayInWeek = voteDate.day();

    const temp = [];
    let isAttend = false;

    if (calendarType === "week") {
      const start = date - dayInWeek - 7;
      for (let i = start; i < start + 7; i++) {
        isAttend = myMonthAttend[i - 1] ? true : false;
        temp.push({ date: i, isAttend });
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
  }, [calendarType, isLoading]);

  const onClickDate = (date) => {
    setVoteDate(voteDate.date(date));
  };

  const onClickPrev = () => {
    setVoteDate((old) => old.subtract(1, "month").date(1));
  };

  const onClickNext = () => {
    setVoteDate((old) => old.add(1, "month").date(1));
  };

  return (
    <Layout layout transition={{ duration: 0.3 }}>
      <Header>
        <Date>
          <span>{dayjs().format("YYYY년 M월")}</span>
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
            {d?.isAttend ? (
              <div>
                <IconCircle>{d?.date}</IconCircle>
              </div>
            ) : (
              <div>{d?.date}</div>
            )}
          </DayItem>
        ))}
      </CallenderDays>
      {calendarType === "month" && (
        <BottomUp onClick={() => setCalendarType("week")}>
          <IconArrowTop />
        </BottomUp>
      )}
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
  padding-bottom: 8px;
  border-bottom: 1px solid #e3e6eb;
`;

const Header = styled.header`
  height: 46px;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px 8px 16px;
`;
const Date = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-family: pretendSemiBold;
    color: var(--font-h1);
    font-size: 20px;
    letter-spacing: -4%;
    align-items: center;
    margin-right: 8px;
  }
`;
const CallenderDays = styled.div<{ isFlex: boolean }>`
  display: flex;
  color: #767d8a;
  margin: 0px 4px;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 15px;
  padding: 0;
  display: ${(props) => (props.isFlex ? "flex" : "grid")};
  justify-content: ${(props) => (props.isFlex ? "spaceBetween" : null)};
  grid-template-columns: ${(props) => (props.isFlex ? null : "repeat(7,1fr)")};
  grid-auto-rows: ${(props) => (props.isFlex ? null : "32px")};
`;

const DayItem = styled(motion.div)`
  flex: 1;
  display: flex;
  > div {
    margin: auto;
    > div {
      color: white;
    }
  }
`;

const BottomUp = styled.div`
  margin-top: 8px;
  height: 12px;
  text-align: center;
  position: relative;
  background-color: #e3e6eb;
  > svg {
    position: absolute;
    top: 30%;
  }
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

export default AboutCallender;
