import styled from "styled-components";
import AttendChart from "../../../components/utils/AttendChart";

function UserInfoChart() {
  return (
    <Layout>
      <AttendChart type="modal" />
    </Layout>
  );
}

const Layout = styled.div``;

export default UserInfoChart;
