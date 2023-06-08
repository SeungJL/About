import styled from "styled-components";
import {
  usePointAllQuery,
  usePointLogAllQuery,
  useScoreLogAllQuery,
} from "../../hooks/user/pointSystem/queries";

function PointSystemLog() {
  const { data: A } = usePointLogAllQuery();
  const { data: B } = useScoreLogAllQuery();

  return <Layout></Layout>;
}

const Layout = styled.div``;

export default PointSystemLog;
