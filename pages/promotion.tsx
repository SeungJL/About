import { useState } from "react";
import styled from "styled-components";
import RuleIcon from "../components/common/Icon/RuleIcon";
import ModalPortal from "../components/common/ModalPortal";
import Header from "../components/layout/Header";
import PromotionRuleModal from "../modals/promotion/PromotionRuleModal";
import PromotionApply from "../pagesComponents/promotion/PromotionApply";
import PromotionDetail from "../pagesComponents/promotion/PromotionDetail";
import PromotionNav from "../pagesComponents/promotion/PromotionNav";

function Promotion() {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Header title="홍보 페이지" url="/promotion">
        <RuleIcon setIsModal={setIsModal} />
      </Header>
      <Layout>
        <PromotionDetail />
        <PromotionApply />
        <PromotionNav />
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <PromotionRuleModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
`;

export default Promotion;
