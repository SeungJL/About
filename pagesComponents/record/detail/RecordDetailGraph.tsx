import styled from "styled-components";
import AttendChart from "../../../components/utils/AttendChart";

function RecordDetailGraph() {
  return (
    <Layout>
      <AttendChart type="main" />
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-md);
`;

export default RecordDetailGraph;
