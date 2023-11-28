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
    <Table cnt={attendCnt}>
      <UserTable attendances={attendances} status={status} />
      <TimeTable />
    </Table>
  );
}

const Table = styled.div<{ cnt: number }>`
  min-height: 160px;
  margin: 0 var(--margin-main);
  padding-top: var(--padding-md);
  display: flex;
  position: relative;
  height: ${(props) => props.cnt * 38 + 48}px;
  border-radius: var(--border-radius2);
  background-color: white;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
`;

export default StudyTimeTable;
