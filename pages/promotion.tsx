import styled from "styled-components";
import Header from "../components/layout/Header";
import PromotionApply from "../pagesComponents/promotion/PromotionApply";
import PromotionDetail from "../pagesComponents/promotion/PromotionDetail";
import PromotionNav from "../pagesComponents/promotion/PromotionContent";
import PromotionTitle from "../pagesComponents/promotion/PromotionTitle";

function Promotion() {
  return (
    <>
      <Header title="홍보 페이지" url="/promotion" />
      <Layout>
        <PromotionTitle />
        <PromotionDetail />

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
