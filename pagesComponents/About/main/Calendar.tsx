import { Skeleton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isMainLoadingState } from "../../../recoil/systemAtoms";

import CalendarDate from "./Calendar/CalendarDate";
import CalendarDay from "./Calendar/CalendarDay";
import CalendarMonth from "./Calendar/CalendarMonth";

function Calendar() {
  const [calendarType, setCalendarType] = useState<"week" | "month">("week");
  const isMainLoading = useRecoilValue(isMainLoadingState);

  return (
    <Layout>
      <CalendarMonth
        calendarType={calendarType}
        setCalendarType={setCalendarType}
      />
      <Skeleton
        m="14px"
        borderY="1px solid var(--font-h6)"
        isLoaded={!isMainLoading}
        startColor="RGB(227, 230, 235)"
        endColor="rgb(246,247,249)"
      >
        <CalendarDay />
        <CalendarDate calendarType={calendarType} />
      </Skeleton>
    </Layout>
  );
}

const Layout = styled(motion.div)`
  margin: 20px 0;
`;

export default Calendar;
