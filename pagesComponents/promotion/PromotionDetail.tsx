import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../components/common/ModalPortal";
import { usePromotionQuery } from "../../hooks/promotion/queries";
import PromotionAllCoolTimeModal from "../../modals/promotion/PromotionAllCoolTimeModal";
import PromotionMyCoolTimeModal from "../../modals/promotion/PromotionMyCoolTimeModal";

function PromotionDetail() {
  const { data: session } = useSession();
  const [isMyModal, setIsMyModal] = useState(false);
  const [isAllModal, setIsAllModal] = useState(false);

  const { data: promotionData } = usePromotionQuery();

  const myApply = promotionData?.find((item) => item.uid === session?.uid);

  return (
    <>
      <Layout>
        <Button
          w="50%"
          mr="var(--margin-md)"
          onClick={() => setIsAllModal(true)}
          color="var(--font-h2)"
          borderRadius="var(--border-radius-sub)"
          border="1px solid var(--font-h6)"
        >
          전체 현황
        </Button>
        <Button
          w="50%"
          onClick={() => setIsMyModal(true)}
          borderRadius="var(--border-radius-sub)"
          color="var(--font-h2)"
          border="1px solid var(--font-h6)"
        >
          우리 학교 쿨타임
        </Button>
      </Layout>
      {isMyModal && (
        <ModalPortal setIsModal={setIsMyModal}>
          <PromotionMyCoolTimeModal
            myApply={myApply}
            setIsModal={setIsMyModal}
          />
        </ModalPortal>
      )}
      {isAllModal && (
        <ModalPortal setIsModal={setIsAllModal}>
          <PromotionAllCoolTimeModal
            setIsModal={setIsAllModal}
            promotionData={promotionData}
          />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  margin: 0 40px;
  margin-top: 40px;
  margin-bottom: var(--margin-main);
`;

export default PromotionDetail;
