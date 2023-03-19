import styled from "styled-components";
import { IAttendence } from "../../../../../models/vote";
import TimeTable from "./TimeTable";
import UserTable from "./UserTable";

function StudyTimeTable({ attendances }: { attendances: IAttendence[] }) {
  console.log(attendances);
  const attendCnt = attendances?.length;
  console.log(5, attendCnt);
  return (
    <Layout cnt={attendCnt}>
      <UserTable attendances={attendances} />
      <TimeTable />
    </Layout>
  );
}

const Layout = styled.div<{ cnt: number }>`
  margin-top: 16px;
  margin-left: 16px;
  position: relative;
  height: ${(props) => props.cnt * 41 + 48}px;
`;

export default StudyTimeTable;
