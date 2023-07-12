import styled from "styled-components";
import { IAttendance } from "../../../types/studyDetails";
import ArrivedComment from "./studySpaceTable/ArrivedComment";
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
      <ArrivedComment attendances={attendances} />
    </>
  );
}

const Table = styled.div<{ cnt: number }>`
  margin: 0 var(--margin-main);
  margin-top: var(--margin-main);
  padding-left: var(--padding-sub);
  position: relative;
  height: ${(props) => props.cnt * 41 + 48}px;
`;

export default StudyTimeTable;
