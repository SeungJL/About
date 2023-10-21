import styled from "styled-components";
import Chart from "../../../components/dataViews/chart/Chart";

function RecordAnalysisGraph() {
  return (
    <Layout>
      <Chart type="study" />
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-md);
`;

export default RecordAnalysisGraph;