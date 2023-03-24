import styled from "styled-components";
import AttendChart from "../../../components/utils/AttendChart";

function UserInfoChart() {
  console.log(33);
  return (
    <Layout>
      <AttendChart type="modal" />
    </Layout>
  );
}

const Layout = styled.div``;

export default UserInfoChart;
