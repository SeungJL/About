import dayjs, { Dayjs } from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import BetweenTextSwitcher from "../../../components2/molecules/navs/BetweenTextSwitcher";
import { dayjsToFormat, dayjsToStr } from "../../../utils/dateTimeUtils";
import StudyVoteControllerDate from "./StudyVoteControllerDates";
import StudyVoteControllerDays from "./StudyVoteControllerDays";
import StudyVoteControllerVote from "./StudyVoteControllerVote";

function StudyVoteController() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const selectedDate = newSearchParams.get("date") || dayjsToStr(dayjs());
  const selectedDateDayjs = dayjs(selectedDate);

  const onClick = (month: number) => {
    const newDate = handleChangeDate(selectedDateDayjs, "month", month);
    newSearchParams.set("date", newDate);
    router.replace(`/?${newSearchParams.toString()}`);
  };

  const textSwitcherProps = getTextSwitcherProps(selectedDateDayjs, onClick);

  return (
    <OuterContainer>
      <InnerContainer>
        <BetweenTextSwitcher
          left={textSwitcherProps.left}
          right={textSwitcherProps.right}
        />
        <ContentContainer>
          <StudyVoteControllerDays selectedDate={selectedDate} />
          <StudyVoteControllerDate />
        </ContentContainer>
        <StudyVoteControllerVote />
      </InnerContainer>
    </OuterContainer>
  );
}

export const getTextSwitcherProps = (
  selectedDateDayjs: Dayjs,
  onClick: (month: number) => void
) => {
  const leftMonth = selectedDateDayjs.subtract(1, "month").month() + 1;
  const rightMonth = selectedDateDayjs.add(1, "month").month() + 1;

  const textSwitcherProps = {
    left: {
      text: `${leftMonth}월`,
      func: () => onClick(leftMonth),
    },
    right: {
      text: `${rightMonth}월`,
      func: () => onClick(rightMonth),
    },
  };
  return textSwitcherProps;
};

export const handleChangeDate = (
  selectedDateDayjs: Dayjs,
  type: "month" | "date",
  num: number
): string => {
  let year = selectedDateDayjs.year();
  let month = selectedDateDayjs.month() + 1;
  let date = selectedDateDayjs.date();

  if (type === "month") {
    if (month === num) date = dayjs().date();
    year += handleYearMoveByMonth(num);
    month = num;
  } else {
    month += handleMonthMoveByDate(num);
    date = num;
  }

  const newDate = dayjsToStr(
    dayjs()
      .year(year)
      .month(month - 1)
      .date(date)
  );
  return newDate;
};

const handleYearMoveByMonth = (month: number) => {
  const currentMonth = dayjs().month() + 1;
  if (currentMonth === 1 && month === 12) return -1;
  else if (currentMonth === 12 && month === 1) return 1;
  return 0;
};

const handleMonthMoveByDate = (date: number) => {
  const currentDate = dayjs().date();
  if (currentDate < 10 && date > 20) return -1;
  else if (currentDate > 20 && date < 10) return 1;
  return 0;
};

export const getDateArr = (selectedDateDayjs: Dayjs) => {
  const temp = [];
  for (let i = -3; i <= 3; i++) {
    const dateDayjs = selectedDateDayjs.add(i, "day");
    temp.push({ day: dayjsToFormat(dateDayjs, "ddd"), date: dateDayjs.date() });
  }

  return temp;
};

// Styled component for the outer container
const OuterContainer = styled.div`
  margin: 0 16px; /* mx-4 */
  margin-top: 16px; /* mt-4 */
  background-color: white;
  height: 192px; /* h-48 */
  border-radius: var(--border-radius-main); /* rounded-lg */
  box-shadow: var(--box-shadow); /* shadow */
  border-bottom: var(--border-main-light); /* border-b-1.5 border-gray-7 */
  position: relative;
`;

// Styled component for the inner container with the border
const InnerContainer = styled.div`
  border-bottom: var(--border-main-light); /* border-b-1.5 border-gray-7 */
  position: relative;
  height: 134px;
`;

// You might need to adjust the margin-top value or make it dynamic/adjustable via props
const ContentContainer = styled.div`
  margin-top: 36px; /* mt-9 */
`;
export default StudyVoteController;
