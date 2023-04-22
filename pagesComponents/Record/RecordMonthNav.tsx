import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

function RecordMonthNav({
  month,
  setMonth,
}: {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
}) {
  return (
    <Layout>
      <FontAwesomeIcon
        icon={faCaretLeft}
        size="xs"
        onClick={() => setMonth(month - 1)}
      />
      <span>{month + 1}월</span>
      <FontAwesomeIcon
        icon={faCaretRight}
        size="xs"
        onClick={() => setMonth(month + 1)}
      />
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 16px;

  font-size: 20px;
  font-weight: 700;
  padding: 0 12px;
  > span {
    margin: 0 4px;
  }
`;

const Button = styled.button``;

export default RecordMonthNav;
