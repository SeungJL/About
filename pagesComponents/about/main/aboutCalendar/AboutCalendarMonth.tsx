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
    setVoteDate((old) => old.add(cnt, "month").date(1));
  };

  return (
    <Layout>
      <MonthMain onClick={onClickToggle}>
        <span>{voteDate.format("YYYY년 M월")}</span>
        {isCalendarWeek ? (
          <IconWrapper>
            <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </IconWrapper>
        ) : (
          <IconWrapper>
            <FontAwesomeIcon icon={faChevronUp} size="xs" />
          </IconWrapper>
        )}
      </MonthMain>
      {!isCalendarWeek && (
        <>
          <MonthNav>
            <IconWrapper>
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={() => onClickMove(-1)}
                size="xs"
              />
            </IconWrapper>
            <IconWrapper>
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={() => onClickMove(1)}
                size="xs"
              />
            </IconWrapper>
          </MonthNav>
        </>
      )}
    </Layout>
  );
}

const IconWrapper = styled.div`
  display: inline-block;
  padding: 0 var(--padding-min);
`;

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
