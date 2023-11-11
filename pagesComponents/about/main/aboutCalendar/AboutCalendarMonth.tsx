import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../../recoil/studyAtoms";

function AboutCalendarMonth() {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  const onClickArrow = (type: "left" | "right") => {
    setVoteDate((old) =>
      type === "left"
        ? old.subtract(1, "month").endOf("month")
        : old.add(1, "month").startOf("month")
    );
  };

  return (
    <Layout>
      <ControlBtn onClick={() => onClickArrow("left")}>
        <ArrowBtn>
          <FontAwesomeIcon icon={faChevronLeft} size="sm" />
        </ArrowBtn>
        <span>{voteDate.month() - 1}월</span>
      </ControlBtn>
      <ControlBtn onClick={() => onClickArrow("right")}>
        <span>{voteDate.month() + 1}월</span>
        <ArrowBtn>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </ArrowBtn>
      </ControlBtn>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  padding: 0 var(--padding-main);
  margin-top: var(--margin-sub);
`;

const ControlBtn = styled.button`
  display: flex;
  color: var(--font-h3);
  > span {
    margin: 0 var(--margin-min);
  }
`;

const ArrowBtn = styled.div``;

export default AboutCalendarMonth;
