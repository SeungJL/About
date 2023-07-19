import styled from "styled-components";
import Chart from "../../../components/features/lib/chart/Chart";

function RecordDetailGraph() {
  return (
    <Layout>
      <Chart type="main" />
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-md);
`;

export default RecordDetailGraph;
