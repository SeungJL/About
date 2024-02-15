import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { voteDateState } from "../../../recoil/studyAtoms";

function StudyControllerMonth() {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);

  const currentMonth = voteDate.month() + 1;

  const leftMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const rightMonth = currentMonth === 12 ? 1 : currentMonth + 1;

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
        <span>{leftMonth}월</span>
      </ControlBtn>
      <ControlBtn onClick={() => onClickArrow("right")}>
        <span>{rightMonth}월</span>
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
  font-size: 14px;
  line-height: 20px;
  padding: 0 var(--gap-4);
  padding-top: var(--gap-4);
`;

const ControlBtn = styled.button`
  display: flex;
  color: var(--gray-2);
  > span {
    margin: 0 var(--gap-1);
  }
`;

const ArrowBtn = styled.div`
  color: var(--gray-3);
`;

export default StudyControllerMonth;
