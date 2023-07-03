import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import PointIntro from "../../pagesComponents/point/PointIntro";
import PointPoint from "../../pagesComponents/point/PointPoint";
import PointScore from "../../pagesComponents/point/PointScore";
import PointPointSkeleton from "../../pagesComponents/point/skeleton/PointPointSkeleton";
import PointScoreSkeleton from "../../pagesComponents/point/skeleton/PointScoreSkeleton";
import { isPointLoadingState } from "../../recoil/loadingAtoms";

function Point() {
  const isPoingLoading = useRecoilValue(isPointLoadingState);

  return (
    <>
      <Header title="" />
      <Layout>
        <PointIntro />
        <Container isLoading={isPoingLoading}>
          <PointScore />
          <PointPoint />
        </Container>
        {isPoingLoading && (
          <>
            <PointScoreSkeleton />
            <PointPointSkeleton />
          </>
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin: 0 14px;
`;

const Container = styled.div<{ isLoading: boolean }>`
  height: ${(props) => props.isLoading && "0px"};
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};
`;

export default Point;
