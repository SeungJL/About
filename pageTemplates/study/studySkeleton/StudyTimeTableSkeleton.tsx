import styled from "styled-components";
import { MainLoadingAbsolute } from "../../../../components/common/loaders/MainLoading";
import TimeTable from "../studyTable/TimeTable";

function StudyTimeTableSkeleton() {
  return (
    <>
      <Table>
        <TimeTable />
        <MainLoadingAbsolute />
      </Table>
    </>
  );
}

const Table = styled.div`
  margin: 0 var(--gap-4);
  margin-top: var(--gap-4);
  padding-left: var(--gap-3);
  position: relative;
  height: 195px;
`;

export default StudyTimeTableSkeleton;
