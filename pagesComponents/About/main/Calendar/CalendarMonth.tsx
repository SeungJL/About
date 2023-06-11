import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { SetStateAction } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../../recoil/studyAtoms";
import { isMainLoadingState } from "../../../../recoil/systemAtoms";

function CalendarMonth({
  calendarType,
  setCalendarType,
}: {
  calendarType: "week" | "month";
  setCalendarType: React.Dispatch<SetStateAction<"week" | "month">>;
}) {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const isMainLoading = useRecoilValue(isMainLoadingState);

  const onClickMove = (cnt: number) => {
    setVoteDate((old) => old.add(cnt, "month").date(cnt));
  };

  return (
    <>
      <Layout>
        {voteDate && (
          <>
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
          </>
        )}
      </Layout>
      {calendarType === "month" && (
        <>
          <MonthNav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => onClickMove(-1)}
              size="sm"
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => onClickMove(1)}
              size="sm"
            />
          </MonthNav>
        </>
      )}
    </>
  );
}

const Layout = styled.span`
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-left: 14px;
  > span {
    color: var(--color-mint);
    font-size: 13px;
    align-items: center;
    margin-right: 8px;
  }
`;
const MonthNav = styled(motion.nav)`
  width: 40px;
  display: flex;
  justify-content: space-between;
  margin-right: 8px;
  color: var(--font-h2);
`;

export default CalendarMonth;
