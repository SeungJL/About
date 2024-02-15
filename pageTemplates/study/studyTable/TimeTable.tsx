import styled from "styled-components";

import { STUDY_TIME_TABLE } from "../../../../constants/settingValue/study/study";

function TimeTable() {
  return (
    <Layout>
      {STUDY_TIME_TABLE.map((hour) => (
        <TimeBlock key={hour} hour={hour} />
      ))}
    </Layout>
  );
}

const TimeBlock = ({ hour }: { hour?: number }) => {
  return (
    <TimeBlockLayout>
      <Time>{hour}</Time>
      <Block />
    </TimeBlockLayout>
  );
};

const Layout = styled.div`
  padding: 0 var(--gap-2);
  position: absolute;
  width: 100%;
  height: 100%;
  padding-bottom: var(--gap-4);
  opacity: 1;
  display: flex;
  justify-content: space-around;
  color: var(--gray-3);
  font-size: 12px;
`;

const TimeBlockLayout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Time = styled.div`
  margin-bottom: var(--gap-1);
`;
const Block = styled.div`
  flex: 1;
  border-left: 1px solid var(--gray-7);
`;

export default TimeTable;
