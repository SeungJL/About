import styled from "styled-components";
import { IAttendance } from "../../../types/studyDetails";
import ArrivedComment from "./StudySpaceTable/ArrivedComment";
import TimeTable from "./StudySpaceTable/TimeTable";
import UserTable from "./StudySpaceTable/UserTable";

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
  margin-top: 16px;
  margin-left: 16px;
  position: relative;
  height: ${(props) => props.cnt * 41 + 48}px;
`;

export default StudyTimeTable;
