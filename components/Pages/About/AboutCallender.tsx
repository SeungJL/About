import { background, position } from "@chakra-ui/react";
import dayjs from "dayjs";
import { relative } from "path";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IconCircle } from "../../../public/icons/IconOutline";
import { IconArrowBottom, IconArrowTop } from "../../../public/icons/Icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isMainLoadingState, voteDateState } from "../../../recoil/atoms";
import {
  Datepicker,
  CalendarPrev,
  CalendarNav,
  CalendarNext,
  CalendarToday,
  SegmentedGroup,
  SegmentedItem,
  setOptions,
  localeNl,
  localeKo,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useVoteQuery } from "../../../hooks/vote/queries";
import {
  IRate,
  useAttendRateQueries,
  useParticipationRateQuery,
  useVoteRateQueries,
  useVoteRateQuery,
} from "../../../hooks/user/queries";
import { useSession } from "next-auth/react";
import { IMonthStartToEnd } from "../../utils/AttendChart";
setOptions({
  locale: localeNl,
  theme: "ios",
  themeVariant: "light",
});
interface ICallender {
  dayCnt: number;
  setDayCnt: Dispatch<SetStateAction<number>>;
}

function AboutCallender({ dayCnt, setDayCnt }: ICallender) {
  const dayOfWeek = dayjs().day();
  const { data: session } = useSession();
  const [calendarType, setCalendarType] = useState<"week" | "month">("week");
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  const [monthList, setMonthList] = useState<IMonthStartToEnd[]>([]);

  useEffect(() => {
    const temp = [];
    for (let i = 1; i <= dayjs().month(voteDate.month()).daysInMonth(); i++) {
      temp.push({
        startDay: voteDate.date(i - 1),
        endDay: voteDate.date(i),
      });
    }
    setMonthList(temp);
  }, [voteDate]);

  const myMonthAttendQueries = useAttendRateQueries(monthList);
  const isLoading = myMonthAttendQueries.some((result) => result.isLoading);
  const myMonthAttend = myMonthAttendQueries?.map((item) => {
    if (!item.isLoading) {
      const myDataArr = (item.data as IRate[]).filter(
        (data) => data.name === session?.user.name
      );
      return myDataArr[0]?.cnt !== 0 && true;
    }
  });

  const markedArr = [];
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
// const [dayArr, setDayArr] = useState<number[]>([]);
// const [voteDate, setVoteDate] = useRecoilState(voteDateState);
// const day = voteDate.date();
// useEffect(() => {
//   const tempArr: number[] = [];
//   const startDay = dayjs().date(1).day();

//   for (let i = 1; i <= dayCnt; i++) {
//     if (dayCnt === 7) tempArr.push(day - dayOfWeek + i - 1);
//     else {
//       if (i <= startDay) tempArr.push(null);
//       else if (i - startDay <= dayjs().daysInMonth())
//         tempArr.push(i - startDay);
//       else tempArr.push(null);
//     }
//   }
//   setDayArr(tempArr);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [dayCnt]);

// const onClickDay = (date) => {
//   setVoteDate(voteDate.date(date));
// };
// return (
//   <Layout layout transition={{ duration: 0.3 }}>
//     <Header>
//       <Date>
//         <span>{dayjs().format("YYYY년 M월")}</span>
//         {dayCnt === 7 && (
//           <div onClick={() => setDayCnt(35)}>
//             <IconArrowBottom />
//           </div>
//         )}
//       </Date>
//     </Header>
//     <DayOfWeek />
//     <CallenderDays isFlex={dayCnt === 7}>
//       {dayArr.map((d, idx) => (
//         <DayItem
//           layout
//           transition={{ duration: 0.3 }}
//           key={idx}
//           onClick={() => onClickDay(d)}
//         >
//           {d === day ? (
//             <div>
//               <IconCircle>{d}</IconCircle>
//             </div>
//           ) : (
//             <div>{d}</div>
//           )}
//         </DayItem>
//       ))}
//     </CallenderDays>
//     {dayCnt === 35 && (
//       <BottomUp onClick={() => setDayCnt(7)}>
//         <IconArrowTop />
//       </BottomUp>
//     )}
//   </Layout>
// );

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

export default AboutCallender;
