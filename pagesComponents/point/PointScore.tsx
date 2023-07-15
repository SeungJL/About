import styled from "styled-components";
import { useScoreQuery } from "../../hooks/user/pointSystem/queries";
import PointScoreBar from "./pointScore/PointScoreBar";
import PointScoreNavigation from "./pointScore/PointScoreNavigation";

function PointScore() {
  const { data } = useScoreQuery();
  const myPoint = data?.score;

  return (
    <Layout>
      <PointScoreBar myPoint={myPoint} />
      <PointScoreNavigation myPoint={myPoint} />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-main);
  border-radius: var(--border-radius-main);
  background-color: white;
  box-shadow: var(--box-shadow);
`;

export default PointScore;
