import styled from "styled-components";
import { IAttendance } from "../../../types/study/studyDetail";
import TimeTable from "./studySpaceTable/TimeTable";
import UserTable from "./studySpaceTable/UserTable";

interface IStudyTimeTable {
  attendances: IAttendance[];
}

function StudyTimeTable({ attendances }: IStudyTimeTable) {
  const attendCnt = attendances.length;

  return (
    <>
      <Table cnt={attendCnt}>
        <UserTable attendances={attendances} />
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
