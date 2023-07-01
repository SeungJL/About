import styled from "styled-components";
import Header from "../../components/layouts/Header";
import PointIntro from "../../pagesComponents/point/PointIntro";
import PointPoint from "../../pagesComponents/point/PointPoint";
import PointScore from "../../pagesComponents/point/PointScore";

function Point() {
  return (
    <>
      <Header title="" />
      <Layout>
        <PointIntro />
        <PointScore />
        <PointPoint />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin: 0 14px;
`;

export default Point;
