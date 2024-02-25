import styled from "styled-components";
import Header from "../components/layout/Header";
import PromotionApply from "../pageTemplates/promotion/PromotionApply";
import PromotionContent from "../pageTemplates/promotion/PromotionContent";
import PromotionDetail from "../pageTemplates/promotion/PromotionDetail";
import PromotionTitle from "../pageTemplates/promotion/PromotionTitle";

function Promotion() {
  return (
    <>
      <Header title="홍보 페이지" />
      <Layout>
        <PromotionTitle />
        <PromotionDetail />
        <PromotionApply />
        <PromotionContent />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

export default Promotion;
