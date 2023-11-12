import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";
import { dayjsToFormat } from "../../../../helpers/dateHelpers";

interface IAboutCalendarDays {
  voteDate: Dayjs;
}
dayjs.locale("ko");
dayjs.locale("ko");
function AboutCalendarDays({ voteDate }: IAboutCalendarDays) {
  const monthDateArr = [];

  for (let i = 0; i < 7; i++) {
    monthDateArr.push(
      dayjsToFormat(
        voteDate.subtract(3, "day").add(i, "day").locale("ko"),
        "ddd"
      )
    );
  }

  return (
    <Layout>
      {monthDateArr.map((date, idx) => (
        <Date key={date} isCenter={idx === 3}>
          {idx !== 3 && date}
        </Date>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 2px;
  margin-top: var(--margin-max);
  display: flex;
  justify-content: space-between;
  color: var(--font-h3);
  font-size: 13px;
`;

const Date = styled.div<{ isCenter: boolean }>`
  text-align: center;
  padding: 0 4px;
  flex: 1;
  margin: ${(props) => props.isCenter && "0 23.8px"};
`;

export default AboutCalendarDays;
