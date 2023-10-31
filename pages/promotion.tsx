import styled from "styled-components";
import Header from "../components/layout/Header";
import PromotionApply from "../pagesComponents/promotion/PromotionApply";
import PromotionContent from "../pagesComponents/promotion/PromotionContent";
import PromotionDetail from "../pagesComponents/promotion/PromotionDetail";
import PromotionTitle from "../pagesComponents/promotion/PromotionTitle";

function Promotion() {
  return (
    <>
      <Header title="홍보 페이지" isNoLine={true} />
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
