import styled from "styled-components";
import PointScoreBar from "./pointScore/PointScoreBar";
import PointScoreNavigation from "./pointScore/PointScoreNavigation";

interface IPointScore {
  myScore: number;
}

function PointScore({ myScore }: IPointScore) {


  return (
    <Layout>
      <PointScoreBar myScore={myScore} />
      <PointScoreNavigation myScore={myScore} />
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
