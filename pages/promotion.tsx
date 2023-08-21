import styled from "styled-components";
import Header from "../components/layout/Header";
import PromotionApply from "../pagesComponents/promotion/PromotionApply";
import PromotionDetail from "../pagesComponents/promotion/PromotionDetail";
import PromotionNav from "../pagesComponents/promotion/PromotionNav";
import PromotionOverview from "../pagesComponents/promotion/PromotionOverview";
import PromotionTitle from "../pagesComponents/promotion/PromotionTitle";

function Promotion() {
  return (
    <>
      <Header title="홍보 페이지" url="/promotion" />
      <Layout>
        <PromotionTitle />
        <PromotionDetail />
        <PromotionOverview />
        <PromotionApply />
        <PromotionNav />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
`;

export default Promotion;
