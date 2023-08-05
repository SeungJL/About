import styled from "styled-components";
import Header from "../components/layout/Header";
import PromotionImage from "../pagesComponents/promotion/PromotionImage";
import PromotionNavigation from "../pagesComponents/promotion/PromotionNavigation";
import PromotionOverview from "../pagesComponents/promotion/PromotionOverview";

function Promotion() {
  return (
    <Layout>
      <Header title="홍보 페이지" />
      <PromotionNavigation />
      <PromotionOverview />
      <PromotionImage />
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
`;

export default Promotion;
