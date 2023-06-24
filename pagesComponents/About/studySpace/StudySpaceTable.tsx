import styled from "styled-components";
import { IAttendance } from "../../../types/studyDetails";
import ArrivedComment from "./StudySpaceTable/ArrivedComment";
import TimeTable from "./StudySpaceTable/TimeTable";
import UserTable from "./StudySpaceTable/UserTable";

interface IStudyTimeTable {
  attendances: IAttendance[];
}

function StudyTimeTable({ attendances }: { attendances: IAttendance[] }) {
  const attendCnt = attendances.length;

  return (
    <>
      <Layout cnt={attendCnt}>
        <UserTable attendances={attendances} />
        <TimeTable />
      </Layout>
      <ArrivedComment attendances={attendances} />
    </>
  );
}

const Layout = styled.div<{ cnt: number }>`
  margin-top: 16px;
  margin-left: 16px;
  position: relative;
  height: ${(props) => props.cnt * 41 + 48}px;
`;

export default StudyTimeTable;
