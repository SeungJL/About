import styled from "styled-components";
import TimeTable from "../studySpaceTable2/TimeTable";

function StudyTimeTableSkeleton() {
  return (
    <>
      <Table>
        <TimeTable />
      </Table>
      <ArrivedComment />
    </>
  );
}

const Table = styled.div`
  margin-top: 16px;
  margin-left: 16px;
  position: relative;
  height: 195px;
`;

const ArrivedComment = styled.div``;

export default StudyTimeTableSkeleton;
