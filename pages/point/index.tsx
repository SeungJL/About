import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PointIntro from "../../pagesComponents/point/PointIntro";
import PointPoint from "../../pagesComponents/point/PointPoint";
import PointScore from "../../pagesComponents/point/PointScore";
import PointPointSkeleton from "../../pagesComponents/point/skeleton/PointPointSkeleton";
import PointScoreSkeleton from "../../pagesComponents/point/skeleton/PointScoreSkeleton";
import { isPointLoadingState } from "../../recoil/loadingAtoms";
import { isGuestState } from "../../recoil/userAtoms";

function Point() {
  const isGuest = useRecoilValue(isGuestState);
  const [isPoingLoading, setIsPointLoading] =
    useRecoilState(isPointLoadingState);

  useEffect(() => {
    setIsPointLoading(true);
    if (isGuest)
      setTimeout(() => {
        setIsPointLoading(false);
      }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  margin: 0 var(--margin-main);
`;

const Container = styled.div<{ isLoading: boolean }>`
  height: ${(props) => props.isLoading && "0px"};
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};
`;

export default Point;
