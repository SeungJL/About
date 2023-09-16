import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../../recoil/studyAtoms";

interface IAboutCalendarMonth {
  calendarType: "week" | "month";
  setCalendarType: React.Dispatch<SetStateAction<"week" | "month">>;
}

function AboutCalendarMonth({
  calendarType,
  setCalendarType,
}: IAboutCalendarMonth) {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  //날짜 변경
  const onClickMove = (cnt: number) => {
    setVoteDate((old) => old.add(cnt, "month").date(cnt));
  };

  return (
    <Layout>
      <span>{voteDate.format("YYYY년 M월")}</span>
      {calendarType === "week" ? (
        <FontAwesomeIcon
          icon={faChevronDown}
          size="xs"
          onClick={() => setCalendarType("month")}
          color="var(--font-h2)"
        />
      ) : (
        <FontAwesomeIcon
          icon={faChevronUp}
          size="xs"
          onClick={() => setCalendarType("week")}
          color="var(--font-h2)"
        />
      )}
      {calendarType === "month" && (
        <>
          <MonthNav>
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
    </Layout>
  );
}

const Layout = styled.span`
  display: flex;
  align-items: center;
  font-weight: 600;
  > span {
    color: var(--font-h2);
    font-size: 14px;
    align-items: center;
    margin-right: var(--margin-md);
  }
`;
const MonthNav = styled.div`
  margin-left: auto;
  width: 40px;
  display: flex;
  justify-content: space-between;
  margin-right: var(--margin-sub);
  color: var(--font-h2);
`;

export default AboutCalendarMonth;
