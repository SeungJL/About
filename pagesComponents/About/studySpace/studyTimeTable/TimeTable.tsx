import styled from "styled-components";

import { VOTE_HOUR_ARR } from "../../../../constants/study";

function TimeTable() {
  return (
    <Layout>
      {VOTE_HOUR_ARR.map((hour) => (
        <TimeBlock key={hour} hour={hour} />
      ))}
    </Layout>
  );
}

const TimeBlock = ({ hour }: { hour: number }) => {
  return (
    <TimeBlockLayout>
      <Time>{hour}</Time>
      <Block />
    </TimeBlockLayout>
  );
};

const Layout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1;
  display: flex;
  color: var(--font-h4);
  font-size: 11px;
`;

const TimeBlockLayout = styled.div`
  flex: 1;
`;

const Time = styled.div`
  margin-left: -8px;
  margin-bottom: 2px;
`;
const Block = styled.div`
  flex: 1;
  height: 92%;
  border-left: 1px solid var(--font-h5);
`;

export default TimeTable;
