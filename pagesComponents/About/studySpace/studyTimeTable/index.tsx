import styled from "styled-components";

import CheckComment from "./CheckComment";
import TimeTable from "./TimeTable";
import UserTable from "./UserTable";

import { IAttendence } from "../../../../types/studyDetails";

function StudyTimeTable({ attendances }: { attendances: IAttendence[] }) {
  const attendCnt = attendances?.length;

  return (
    <>
      <Layout cnt={attendCnt}>
        <UserTable attendances={attendances} />
        <TimeTable />
      </Layout>
      <CheckComment attendances={attendances} />
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
