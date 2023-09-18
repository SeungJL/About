import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useScoreQuery } from "../../hooks/user/pointSystem/queries";
import { isGuestState } from "../../recoil/userAtoms";
import PointScoreBar from "./pointScore/PointScoreBar";
import PointScoreNavigation from "./pointScore/PointScoreNavigation";

function PointScore() {
  const isGuest = useRecoilValue(isGuestState);
  const { data, isLoading } = useScoreQuery({
    enabled: !isGuest,
  });

  const myScore = isGuest ? 0 : data?.score;

  return (
    <>
      {!isLoading && (
        <Layout>
          <PointScoreBar myScore={myScore} />
          <PointScoreNavigation myScore={myScore} />
        </Layout>
      )}
    </>
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
