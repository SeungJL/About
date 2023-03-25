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
import { useAttendRateQueries } from "../../../hooks/user/queries";
import { useSession } from "next-auth/react";
import { IDateStartToEnd } from "../../../models/dateTime";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

function AboutCallender() {
  const { data: session } = useSession();
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  const [calendarType, setCalendarType] = useState<"week" | "month">("week");
  const [monthRange, setMonthRange] = useState<IDateStartToEnd[]>([]);

  useEffect(() => {
    const temp = [];
    for (let i = 1; i <= dayjs().month(voteDate.month()).daysInMonth(); i++) {
      temp.push({
        start: voteDate.date(i - 1),
        end: voteDate.date(i),
      });
    }
    setMonthRange(temp);
  }, [voteDate]);

  const myMonthAttendQueries = useAttendRateQueries(monthRange);
  const isLoading = myMonthAttendQueries.some((result) => result.isLoading);
  const myMonthAttend = myMonthAttendQueries?.map((item) => {
    if (item.isSuccess) {
      const myDataArr = item.data?.filter(
        (data) => data.name === session?.user.name
      );
      return myDataArr[0]?.cnt !== 0 && true;
    }
  });

  const markedArr: { date: Date; color: string }[] = [];
  if (!isLoading) {
    for (let i = 0; i < myMonthAttend.length; i++) {
      if (myMonthAttend[i]) {
        markedArr.push({
          date: new Date(voteDate.year(), voteDate.month(), i),
          color: "var(--color-mint)",
        });
      }
    }
  }

  const CalendarHeader = () => (
    <Header>
      <span>{voteDate.format("YYYY년 M월")}</span>
      {calendarType === "week" ? (
        <IConArrowWrapper onClick={() => setCalendarType("month")}>
          <IconArrowBottom />
        </IConArrowWrapper>
      ) : (
        <>
          <IConArrowWrapper onClick={() => setCalendarType("week")}>
            <IconArrowTop />
          </IConArrowWrapper>{" "}
          <Tooltip>
            <IconCircle />
            <span>스터디 참여</span>
          </Tooltip>
          <HeaderNav>
            <CalendarPrev />
            <CalendarNext />
          </HeaderNav>
        </>
      )}
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

/** Callender */

const Layout = styled(motion.div)`
  padding-bottom: 8px;
  min-height: 120px;
`;
const StyledDatePicker = styled(Datepicker)`
  .mbsc-ios .mbsc-selected .mbsc-calendar-cell-text {
    background-color: var(--color-mint);
    border-color: var(--color-mint);
  }
  .mbsc-ios.mbsc-calendar-button.mbsc-button {
    color: var(--font-h2);
  }
  .mbsc-calendar-controls {
    > header {
      justify-content: start !important;
    }
  }
  .mbsc-calendar-wrapper {
    border: none;
  }
`;

/** Header */

const Header = styled.header`
  height: 46px;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px 8px 16px;
  width: 100%;
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
const HeaderNav = styled.nav`
  margin-left: auto;
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
const IConArrowWrapper = styled.div`
  padding-bottom: 4px;
  margin-left: 4px;
`;
const IconCircle = styled.div`
  background-color: var(--color-mint);
  border-radius: 50%;
  width: 6px;
  height: 6px;
`;

export default AboutCallender;
