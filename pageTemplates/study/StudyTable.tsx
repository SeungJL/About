import styled from "styled-components";
import { IAttendance, StudyStatus } from "../../../types/study/studyDetail";
import TimeTable from "./studyTable/TimeTable";
import UserTable from "./studyTable/UserTable";

interface IStudyTimeTable {
  attendances: IAttendance[];
  status: StudyStatus;
}

function StudyTimeTable({ attendances, status }: IStudyTimeTable) {
  const attendCnt = attendances.length;

  return (
    <Table cnt={attendCnt}>
      <UserTable attendances={attendances} status={status} />
      <TimeTable />
    </Table>
  );
}

const Table = styled.div<{ cnt: number }>`
  min-height: 160px;
  margin: 0 var(--gap-4);
  padding-top: var(--gap-2);
  display: flex;
  position: relative;
  height: ${(props) => props.cnt * 38 + 48}px;
  border-radius: var(--rounded);
  background-color: white;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
`;

export default StudyTimeTable;
