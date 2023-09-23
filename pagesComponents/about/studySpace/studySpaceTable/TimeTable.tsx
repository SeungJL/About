import styled from "styled-components";

import { STUDY_TIME_TABLE } from "../../../../constants/settingValue/study";

function TimeTable() {
  return (
    <Layout>
      {STUDY_TIME_TABLE.map((hour) => (
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

const TimeBlockLayout = styled.div``;

const Time = styled.div`
  margin-left: -6px;
  margin-bottom: 2px;
`;
const Block = styled.div`
  width: 26px;
  height: 92%;
  border-left: 1px solid var(--font-h5);
`;

export default TimeTable;
