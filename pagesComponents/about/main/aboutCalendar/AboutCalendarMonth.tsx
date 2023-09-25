import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../../recoil/studyAtoms";
import { DispatchBoolean } from "../../../../types/reactTypes";

interface IAboutCalendarMonth {
  isCalendarWeek: boolean;
  setIsCalendarWeek: DispatchBoolean;
}

function AboutCalendarMonth({
  isCalendarWeek,
  setIsCalendarWeek,
}: IAboutCalendarMonth) {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  const onClickToggle = () => {
    setIsCalendarWeek((old) => !old);
  };
  //날짜 변경
  const onClickMove = (cnt: number) => {
    setVoteDate((old) => old.add(cnt, "month").date(cnt));
  };

  return (
    <Layout>
      <MonthMain onClick={onClickToggle}>
        <span>{voteDate.format("YYYY년 M월")}</span>
        {isCalendarWeek ? (
          <FontAwesomeIcon icon={faChevronDown} size="xs" />
        ) : (
          <FontAwesomeIcon icon={faChevronUp} size="xs" />
        )}
      </MonthMain>
      {!isCalendarWeek && (
        <>
          <MonthNav>
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => onClickMove(-1)}
              size="xs"
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => onClickMove(1)}
              size="xs"
            />
          </MonthNav>
        </>
      )}
    </Layout>
  );
}

const Layout = styled.span`
  margin: 0 var(--padding-main);
  display: flex;
  align-items: center;
  color: var(--font-h3);
  font-weight: 600;
`;

const MonthMain = styled.div`
  > span {
    font-size: 12px;
    align-items: center;
    margin-right: var(--margin-min);
  }
`;

const MonthNav = styled.div`
  align-self: flex-end;
  margin-left: auto;
  width: 40px;
  display: flex;
  justify-content: space-between;
  margin-right: var(--margin-md);
`;

export default AboutCalendarMonth;
