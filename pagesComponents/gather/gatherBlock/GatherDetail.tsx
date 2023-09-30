import { faCalendarClock, faUserCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { dayjsToFormat } from "../../../helpers/dateHelpers";

interface IGatherDetail {
  age: number[];
  date: string;
}

function GatherDetail({ age, date }: IGatherDetail) {
  return (
    <Layout>
      <Age>
        <FontAwesomeIcon icon={faUserCheck} color="var(--font-h4)" />
        <span>
          {age[0]}~{age[1]}세
        </span>
      </Age>
      <Date>
        <FontAwesomeIcon icon={faCalendarClock} color="var(--font-h4)" />
        <span>
          {date === "미정" ? date : dayjsToFormat(dayjs(date), "M월 D일")}
        </span>
      </Date>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 2;
`;
const Age = styled.div`
  > span {
    margin-left: var(--margin-md);
  }
`;
const Date = styled.div`
  > span {
    margin-left: 10px;
  }
`;
export default GatherDetail;
