import styled from "styled-components";
import { IAttendance, StudyStatus } from "../../../types/study/studyDetail";
import TimeTable from "./studySpaceTable/TimeTable";
import UserTable from "./studySpaceTable/UserTable";

interface IStudyTimeTable {
  attendances: IAttendance[];
  status: StudyStatus;
}

function StudyTimeTable({ attendances, status }: IStudyTimeTable) {
  const attendCnt = attendances.length;

  return (
    <>
      <Table cnt={attendCnt}>
        <UserTable attendances={attendances} status={status} />
        <TimeTable />
      </Table>
    </>
  );
}

const Table = styled.div<{ cnt: number }>`
  min-height: 73px;
  margin: 0 var(--margin-main);
  margin-top: var(--margin-main);
  position: relative;
  height: ${(props) => props.cnt * 45 + 28}px;
`;

export default StudyTimeTable;
