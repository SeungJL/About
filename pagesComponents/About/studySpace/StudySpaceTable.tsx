import styled from "styled-components";

import ArrivedComment from "./StudySpaceTable/ArrivedComment";
import TimeTable from "./StudySpaceTable/TimeTable";
import UserTable from "./StudySpaceTable/UserTable";

import { IAttendence } from "../../../types/studyDetails";

function StudyTimeTable({ attendances }: { attendances: IAttendence[] }) {
  const attendCnt = attendances?.length;

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
