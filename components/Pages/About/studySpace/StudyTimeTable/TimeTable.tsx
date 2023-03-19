import styled from "styled-components";

const HoursArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

function TimeTable() {
  return (
    <Layout>
      {HoursArr.map((hour) => (
        <TimeBlock key={hour} hour={hour} />
      ))}
    </Layout>
  );
}
const Layout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1;
  display: flex;
  color: var(--font-h4);
  font-size: 11px;
`;

const TimeBlock = ({ hour }: { hour: number }) => {
  return (
    <TimeBlockLayout>
      <Time>{hour}</Time>
      <Block />
    </TimeBlockLayout>
  );
};

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
